<?php

namespace App\Listeners;

use App\Events\CodeCreatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
// Mail 
use Illuminate\Support\Facades\Mail;
// Custom Mail
use App\Mail\CodeToChangePasswordMail;

class CodeCreatedEventListener
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
     * @param  \App\Events\CodeCreatedEvent  $event
     * @return void
     */
    public function handle(CodeCreatedEvent $event)
    {   
        Mail::to($event->email)->send(new CodeToChangePasswordMail($event->name, $event->code));
    }
}
