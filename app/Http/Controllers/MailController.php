<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Http\Requests\MailRequest;
use App\Jobs\SendEmail;
use Log;
use Artisan;

class MailController extends Controller
{
	public function sendMailNotification(MailRequest $request)
	{
		if($request->validated())
		{
			SendEmail::dispatch($request->subject, $request->message, $request->users)->onConnection('redis');
        	Log::info('Dispatched mails, starting queue...');
        	//Artisan::call('queue:work', ['--once' => true]);
        	// Artisan::call('queue:work', ['--stop-when-empty' => true]); -> The "stop-when-empty" option does not exist.
        	return response()->json(['message' => 'success'], 200);
		}
		return response()->json(['message' => 'invalid data'], 400);
	}
}