<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CodeToChangePasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    private $data = [];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $name, string $code)
    {
        $name_parts = explode(" ", $name);
        $first_name = $name_parts[0];

        $this->data = [
            "subject" => "LARAV-REACT - Code to change password",
            "title" => "Hello $first_name,",
            "header_text" => "We have received your password change request at".date("Y-m-d H:i:s"),
            "footer_text" => "If you didnt do it, please contact the support.",
            "code" => $code
        ];

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->$data["subject"])->view('emails.send_code_to_change_password')->with($this->data);
    }
}
