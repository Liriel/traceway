<?php

namespace App\Message;

class PaymentProcessorMessage
{
    public function __construct(
        public readonly float $amount,
        public readonly string $currency = 'USD',
    ) {}
}
