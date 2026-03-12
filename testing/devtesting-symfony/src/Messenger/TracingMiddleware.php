<?php

namespace App\Messenger;

use OpenTelemetry\API\Globals;
use OpenTelemetry\API\Trace\SpanKind;
use OpenTelemetry\API\Trace\StatusCode;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Middleware\MiddlewareInterface;
use Symfony\Component\Messenger\Middleware\StackInterface;
use Symfony\Component\Messenger\Stamp\ReceivedStamp;

class TracingMiddleware implements MiddlewareInterface
{
    public function handle(Envelope $envelope, StackInterface $stack): Envelope
    {
        if (!$envelope->last(ReceivedStamp::class)) {
            return $stack->next()->handle($envelope, $stack);
        }

        $message = $envelope->getMessage();
        $spanName = $this->resolveSpanName($message);

        $tracer = Globals::tracerProvider()->getTracer('devtesting-symfony');
        $span = $tracer->spanBuilder($spanName)
            ->setParent(false)
            ->setSpanKind(SpanKind::KIND_CONSUMER)
            ->startSpan();
        $scope = $span->activate();

        try {
            $envelope = $stack->next()->handle($envelope, $stack);
        } catch (\Throwable $e) {
            $span->recordException($e);
            $span->setStatus(StatusCode::STATUS_ERROR, $e->getMessage());
            throw $e;
        } finally {
            $span->end();
            $scope->detach();
        }

        return $envelope;
    }

    private function resolveSpanName(object $message): string
    {
        if ($message instanceof TracedMessage) {
            return $message->getSpanName();
        }

        $class = (new \ReflectionClass($message))->getShortName();
        $class = preg_replace('/Message$/', '', $class);

        // PascalCase → dot.separated lowercase
        $name = preg_replace('/([a-z])([A-Z])/', '$1.$2', $class);
        return strtolower($name);
    }
}
