<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Crypt;

class UserRegistrationMail extends Mailable
{
    use Queueable, SerializesModels;

    private $data = [];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $id, string $name)
    {   

        $name_parts = explode(" ", $name);
        $first_name = $name_parts[0];

        $crypted_id = Crypt::encryptString($id);

        $this->data = [
            "subject" => "LARAV-REACT - Account Verification",
            "title" => "Hello $first_name,",
            "header_text" => "You have created and account in our system! Now its necessary just one more step: confirm your email and activate your account.",
            "footer_text" => "If this email is a mistake, please, just ignore it.",
            "link" => "http://localhost:8000/api/do-confirm-registration?user=$crypted_id"
        ];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->data["subject"])->view('emails.verify_email_notification')->with($this->data);
    }
}
