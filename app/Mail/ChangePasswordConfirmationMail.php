<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ChangePasswordConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    private $data = [];
    private $email;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $name, string $email)
    {
        $name_parts = explode(" ", $name);
        $first_name = $name_parts[0];

        $this->data = [
            "subject" => "LARAV-REACT - Password Change",
            "title" => "Hello $first_name,",
            "header_text" => "Your password has been changed at ".date("Y-m-d H:i:s"),
            "footer_text" => "If you didnt do it, please contact the support."
        ];

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->data["subject"])->view('emails.notify_changed_password')->with($this->data);
    }
}
