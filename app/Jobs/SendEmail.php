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
        $usersData = User::select('Email', 'Name')->whereIn('id', $this->users)->get();
        //Redis::throttle('throttle:user-notification-emails')->allow(2)->every(60)->then(function () use($usersData) {
        for ($i=0; $i < 10000; $i++) { 
            foreach ($usersData as $key => $user) {
                    $emailData = [
                        'subject' => $this->subject,
                        'header' => 'Witaj ' . $user->Name . '!',
                        'content' => $this->message
                    ];
                Mail::to($user->Email)->send(new NotifyUsers($emailData));
                Log::info('($i)Emailed to: ' . $user->Email);
            }
        }
        //}, function () {
        //    return $this->release(3);
        //});
    }
}
