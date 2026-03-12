<?php

namespace App\MessageHandler;

use App\Message\PaymentProcessorMessage;
use OpenTelemetry\API\Globals;
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\API\Trace\SpanKind;
use OpenTelemetry\API\Trace\StatusCode;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class PaymentProcessorHandler
{
    public function __invoke(PaymentProcessorMessage $message): void
    {
        $tracer = Globals::tracerProvider()->getTracer('devtesting-symfony');

        $validateSpan = $tracer->spanBuilder('validate.payment')
            ->setSpanKind(SpanKind::KIND_INTERNAL)
            ->startSpan();
        $validateSpan->setAttribute('payment.amount', $message->amount);
        $validateSpan->setAttribute('payment.currency', $message->currency);
        usleep(random_int(20, 100) * 1000);
        $validateSpan->end();

        $chargeSpan = $tracer->spanBuilder('charge.gateway')
            ->setSpanKind(SpanKind::KIND_CLIENT)
            ->startSpan();
        usleep(random_int(100, 500) * 1000);

        $err = new \RuntimeException('gateway timeout: payment provider unreachable');
        $chargeSpan->setStatus(StatusCode::STATUS_ERROR, $err->getMessage());
        $chargeSpan->recordException($err);
        $chargeSpan->end();

        $rootSpan = Span::getCurrent();
        $rootSpan->setStatus(StatusCode::STATUS_ERROR, $err->getMessage());
        $rootSpan->recordException($err);
    }
}
