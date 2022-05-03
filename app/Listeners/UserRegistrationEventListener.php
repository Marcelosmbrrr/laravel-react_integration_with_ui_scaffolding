<?php

namespace App\Listeners;

use App\Events\UserRegistrationEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
// Mail Class
use Illuminate\Support\Facades\Mail;
// Custom Mail
use App\Mail\UserRegistrationMail;
// Event to listen
use App\Events\UserRegistration;

class UserRegistrationEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event data.
     * Action: send email verification to the new user
     *
     * @param  \App\Events\UserRegistrationEvent  $event
     * @return void
     */
    public function handle(UserRegistrationEvent $event)
    {
        Mail::to($event->new_user_email)->send(new UserRegistrationMail($event->new_user_name));
    }
}
