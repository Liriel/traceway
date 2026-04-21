type Track = {
  badge: string;
  title: string;
  description: string;
  items: string[];
};

export function TwoTrack({ detect, resolve }: { detect: Track; resolve: Track }) {
  return (
    <div className="tracks">
      <div className="track" data-kind="detect">
        <span className="track-badge">{detect.badge}</span>
        <h3>{detect.title}</h3>
        <p>{detect.description}</p>
        <ul className="track-list">
          {detect.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div className="track" data-kind="resolve">
        <span className="track-badge">{resolve.badge}</span>
        <h3>{resolve.title}</h3>
        <p>{resolve.description}</p>
        <ul className="track-list">
          {resolve.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
