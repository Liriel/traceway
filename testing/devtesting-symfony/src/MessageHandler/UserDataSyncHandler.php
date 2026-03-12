<?php

namespace App\MessageHandler;

use App\Message\UserDataSyncMessage;
use OpenTelemetry\API\Trace\Span;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class UserDataSyncHandler
{
    public function __invoke(UserDataSyncMessage $message): void
    {
        $span = Span::getCurrent();

        $span->setAttribute('sync.source', $message->source);

        $dbPath = dirname(__DIR__, 2) . '/var/devtesting.db';
        $db = new \PDO("sqlite:$dbPath");
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $db->exec('CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )');

        $stmt = $db->query('SELECT COUNT(*) as count FROM users');
        $count = $stmt->fetch(\PDO::FETCH_ASSOC)['count'];

        $span->setAttribute('sync.users_count', (int) $count);
        $span->addEvent('user data sync completed');
    }
}
