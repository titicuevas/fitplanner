<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    public function createApplication(): Application
    {
        $this->ensureTestingAppKey();

        $app = require Application::inferBasePath().'/bootstrap/app.php';
        $app->make(Kernel::class)->bootstrap();

        return $app;
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
    }

    /**
     * Genera APP_KEY solo en runtime de tests (nunca se versiona en git).
     */
    private function ensureTestingAppKey(): void
    {
        if (! empty($_ENV['APP_KEY']) || ! empty(getenv('APP_KEY'))) {
            return;
        }

        $key = 'base64:'.base64_encode(random_bytes(32));

        putenv('APP_KEY='.$key);
        $_ENV['APP_KEY'] = $key;
        $_SERVER['APP_KEY'] = $key;
    }
}
