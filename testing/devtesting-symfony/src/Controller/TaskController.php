<?php

namespace App\Controller;

use App\Message\DataProcessorMessage;
use App\Message\EmailSendMessage;
use App\Message\PaymentProcessorMessage;
use App\Message\UserDataSyncMessage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;

class TaskController
{
    public function __construct(
        private readonly MessageBusInterface $bus,
    ) {}

    #[Route('/test-task', methods: ['GET'])]
    public function testTask(): JsonResponse
    {
        $this->bus->dispatch(new DataProcessorMessage(batchSize: 10));

        return new JsonResponse(['status' => 'dispatched', 'task' => 'traceway data processor']);
    }

    #[Route('/test-task-simple', methods: ['GET'])]
    public function testTaskSimple(): JsonResponse
    {
        $this->bus->dispatch(new EmailSendMessage(
            to: 'user@example.com',
            subject: 'Welcome to Traceway',
        ));

        return new JsonResponse(['status' => 'dispatched', 'task' => 'email.send']);
    }

    #[Route('/test-task-db', methods: ['GET'])]
    public function testTaskDb(): JsonResponse
    {
        $this->bus->dispatch(new UserDataSyncMessage(source: 'primary'));

        return new JsonResponse(['status' => 'dispatched', 'task' => 'user.data.sync']);
    }

    #[Route('/test-task-error', methods: ['GET'])]
    public function testTaskError(): JsonResponse
    {
        $this->bus->dispatch(new PaymentProcessorMessage(amount: 99.99, currency: 'USD'));

        return new JsonResponse(['status' => 'dispatched', 'task' => 'payment.processor']);
    }
}
