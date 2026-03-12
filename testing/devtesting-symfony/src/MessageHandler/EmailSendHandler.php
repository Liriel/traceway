<?php

namespace App\MessageHandler;

use App\Message\EmailSendMessage;
use OpenTelemetry\API\Trace\Span;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class EmailSendHandler
{
    public function __invoke(EmailSendMessage $message): void
    {
        $span = Span::getCurrent();

        $span->setAttribute('email.to', $message->to);
        $span->setAttribute('email.subject', $message->subject);
        $span->setAttribute('email.template', $message->template);

        usleep(random_int(50, 300) * 1000);
    }
}
