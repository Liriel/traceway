<?php

namespace App\Message;

class DataProcessorMessage
{
    public function __construct(
        public readonly int $batchSize = 10,
    ) {}
}
