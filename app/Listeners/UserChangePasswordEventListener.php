<?php

namespace App\Listeners;

use App\Events\UserChangePasswordEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
// Mail 
use Illuminate\Support\Facades\Mail;
// Custom Mail
use App\Mail\ChangePasswordConfirmationMail;

class UserChangePasswordEventListener
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
     * Handle the event.
     *
     * @param  \App\Events\UserChangePasswordEvent  $event
     * @return void
     */
    public function handle(UserChangePasswordEvent $event)
    {
        Mail::to($event->email)->send(new ChangePasswordConfirmationMail($event->name, $event->email));
    }
}
