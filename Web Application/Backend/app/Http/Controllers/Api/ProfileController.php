<?php

namespace App\Http\Controllers\Api;

use App\Models\Doctor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\DoctorResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\ApiResponseTrait;
use Illuminate\Support\Facades\Password;




class ProfileController extends Controller
{
    use ApiResponseTrait;
    // doctor profile

    public function editProfile(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'phone_num' => 'required',
            'img' => 'required|image|mimes:png,jpg,gif,jpeg,svg|max:2048',
            'info' => 'required',
            'bio' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 401);
        }
        // ------
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('img/doctors/', $fileName);
        }
        //--------
        $user = Doctor::where('user_id', '=', Auth::id())->first();
        $user->user->name = $request->name;
        $user->user->phone_num = $request->phone_num;
        $user->user->img = 'img/doctors/' . $fileName;
        $user->info = $request->info;
        $user->bio = $request->bio;
        $user->save();
        return $this->apiResponse($user, 'ok', 200);
    }

    public function doctorProfile()
    {
        $user = Auth::id();
        $doctor = new DoctorResource(Doctor::where('user_id', '=', $user)->first());
        return $this->apiResponse($doctor, 'ok', 200);
    }


    // //----------

    // // Generate the reset token and send it via email
    // public function forgotPassword(Request $request, MailerInterface $mailer)
    // {
    //     $request->validate(['email' => 'required|email']);

    //     $token = 4125;// Generate a unique verification code or token

    //         $email = (new Email())
    //         ->from('abdelrhmanyasser8262@gmail.com')
    //         ->to($request->email)
    //         ->subject('Password Reset')
    //         ->text("Your password reset code is: $token");

    //     $mailer->send($email);

    //     return response()->json(['message' => 'Reset password code sent to your email']);
    // }
    // // Verify the reset token and reset the password
    // public function resetPassword(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //         'token' => 'required|string',
    //         'password' => 'required|string|min:8|confirmed',
    //     ]);

    //     $response = Password::reset(
    //         $request->only('email', 'password', 'password_confirmation', 'token'),
    //         function ($user, $password) {
    //             $user->forceFill([
    //                 'password' => bcrypt($password),
    //             ])->save();
    //         }
    //     );

    //     if ($response === Password::PASSWORD_RESET) {
    //         return response()->json(['message' => 'Password has been successfully reset']);
    //     } else {
    //         return response()->json(['message' => 'Unable to reset password'], 500);
    //     }
    // }
}
