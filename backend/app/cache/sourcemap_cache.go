package cache

import (
	"container/list"
	"sync"
)

type sourceMapCacheEntry struct {
	key  string
	data []byte
}

type sourceMapCache struct {
	maxCount  int
	maxBytes  int64
	mu        sync.Mutex
	items     map[string]*list.Element
	order     *list.List
	curBytes  int64
	hits      uint64
	misses    uint64
	evictions uint64
}

type SourceMapCacheStats struct {
	Entries    int
	Bytes      int64
	MaxEntries int
	MaxBytes   int64
	Hits       uint64
	Misses     uint64
	Evictions  uint64
}

var SourceMapCache *sourceMapCache

func InitSourceMapCache(maxCount int, maxBytes int64) {
	SourceMapCache = &sourceMapCache{
		maxCount: maxCount,
		maxBytes: maxBytes,
		items:    make(map[string]*list.Element),
		order:    list.New(),
	}
}

func (c *sourceMapCache) Get(key string) ([]byte, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if el, ok := c.items[key]; ok {
		c.hits++
		c.order.MoveToFront(el)
		return el.Value.(*sourceMapCacheEntry).data, true
	}
	c.misses++
	return nil, false
}

func (c *sourceMapCache) Put(key string, data []byte) {
	c.mu.Lock()
	defer c.mu.Unlock()

	dataSize := int64(len(data))

	if el, ok := c.items[key]; ok {
		c.curBytes -= int64(len(el.Value.(*sourceMapCacheEntry).data))
		el.Value.(*sourceMapCacheEntry).data = data
		c.curBytes += dataSize
		c.order.MoveToFront(el)
	} else {
		entry := &sourceMapCacheEntry{key: key, data: data}
		el := c.order.PushFront(entry)
		c.items[key] = el
		c.curBytes += dataSize
	}

	for c.order.Len() > c.maxCount || c.curBytes > c.maxBytes {
		back := c.order.Back()
		if back == nil {
			break
		}
		evicted := c.order.Remove(back).(*sourceMapCacheEntry)
		delete(c.items, evicted.key)
		c.curBytes -= int64(len(evicted.data))
		c.evictions++
	}
}

func (c *sourceMapCache) Stats() SourceMapCacheStats {
	c.mu.Lock()
	defer c.mu.Unlock()

	return SourceMapCacheStats{
		Entries:    len(c.items),
		Bytes:      c.curBytes,
		MaxEntries: c.maxCount,
		MaxBytes:   c.maxBytes,
		Hits:       c.hits,
		Misses:     c.misses,
		Evictions:  c.evictions,
	}
}
