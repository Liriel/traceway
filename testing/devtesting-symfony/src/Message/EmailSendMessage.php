<?php

namespace App\Message;

class EmailSendMessage
{
    public function __construct(
        public readonly string $to,
        public readonly string $subject,
        public readonly string $template = 'welcome_v2',
    ) {}
}
