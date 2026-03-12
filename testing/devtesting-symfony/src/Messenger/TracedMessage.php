<?php

namespace App\Messenger;

interface TracedMessage
{
    public function getSpanName(): string;
}
