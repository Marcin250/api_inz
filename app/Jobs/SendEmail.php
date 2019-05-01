<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\NotifyUsers;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Mail;
use Log;
use App\User;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $subject;
    private $message;
    private $users;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($subject, $message, $users)
    {
        $this->subject = $subject;
        $this->message = $message;
        $this->users = $users;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->users as $key => $user) {
            Redis::throttle('user-notification-emails')->allow(1)->every(5)->then(function () use($user) {
                    $emailData = [
                        'subject' => $this->subject,
                        'header' => 'Witaj ' . $user->Name . '!',
                        'content' => $this->message
                    ];
                    Mail::to($user->Email)->queue(new NotifyUsers($emailData));
                    Log::info('Emailed to: ' . $user->Email);
            }, function () {
                return $this->release(3);
            });
        }
    }
}
