<?php

namespace App\Message;

class UserDataSyncMessage
{
    public function __construct(
        public readonly string $source = 'primary',
    ) {}
}
