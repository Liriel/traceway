<?php

namespace App\MessageHandler;

use App\Message\DataProcessorMessage;
use OpenTelemetry\API\Globals;
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\API\Trace\SpanKind;
use OpenTelemetry\API\Trace\StatusCode;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class DataProcessorHandler
{
    public function __invoke(DataProcessorMessage $message): void
    {
        $tracer = Globals::tracerProvider()->getTracer('devtesting-symfony');

        $loadSpan = $tracer->spanBuilder('loading data')
            ->setSpanKind(SpanKind::KIND_INTERNAL)
            ->startSpan();
        usleep(random_int(100, 2000) * 1000);
        $loadSpan->end();

        $rootSpan = Span::getCurrent();

        for ($i = 0; $i < $message->batchSize; $i++) {
            $rootSpan->addEvent("data loaded successfully $i");
        }

        $rootSpan->setStatus(StatusCode::STATUS_ERROR, 'what an error');
        $rootSpan->recordException(new \RuntimeException('what an error'));
    }
}
