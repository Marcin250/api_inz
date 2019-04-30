<?php

namespace App\Http\Controllers;

use App\User;
use Validator;
use Illuminate\Http\Request;
use App\Http\Requests\MailRequest;
use App\Jobs\SendEmail;
use Log;

class MailController extends Controller
{
	public function sendMailNotification(MailRequest $request)
	{
		if($request->validated())
		{
			$users = User::select('Email', 'Name')->whereIn('id', $request->users)->get();
			SendEmail::dispatch($request->subject, $request->message, $users);
        	Log::info('Dispatched mails');
        	return response()->json(['status' => true, 'error' => ''], 200);
		}
		return response()->json(['status' => false, 'error' => 'invalid data'], 400);
	}
}