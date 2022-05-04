<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
// Custom Events
use App\Events\UserRegistrationEvent;
use App\Events\CodeCreatedEvent;
use App\Events\UserChangePasswordEvent;
// Custom listeners
use App\Listeners\UserRegistrationEventListener;
use App\Listeners\CodeCreatedEventListener;
use App\Listeners\UserChangePasswordEventListener;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        UserRegistrationEvent::class => [
            UserRegistrationEventListener::class
        ],
        CodeCreatedEvent::class => [
            CodeCreatedEventListener::class
        ],
        UserChangePasswordEvent::class => [
            UserChangePasswordEventListener::class
        ]

    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
