<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfilleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $userID = Auth::id();
        $doctor = Doctor::where('user_id', '=', $userID)->first();
        return view('doctorProfile.index')->with('doctor', $doctor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'phone_num' => 'required',
            //'img' => 'required|image',
            'info' => 'required',
            'bio' => 'required'

        ]);

        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('img/doctors/', $fileName);

            //---------
            $userID = Auth::id();
            $user = User::find($userID);
            $user->name = $request->name;
            $user->phone_num = $request->phone_num;
            $user->img = 'img/doctors/' . $fileName;
            $user->save();
            //-----
            $doctor = Doctor::where('user_id', '=', Auth::id())->first();
            $doctor->info = $request->info;
            $doctor->bio = $request->bio;
            $doctor->save();
            return redirect()->back();
        }else{
        ///---------
        $userID = Auth::id();
        $user = User::find($userID);
        $user->name = $request->name;
        $user->phone_num = $request->phone_num;
        $user->save();
        //-----
        $doctor = Doctor::where('user_id', '=', Auth::id())->first();
        $doctor->info = $request->info;
        $doctor->bio = $request->bio;
        $doctor->save();
        return redirect()->back();
        }
    }

    //-----------
    //fees to secretary

    public function fees(){
        $doctors = User::where('type','doctor')->get();
        return view('doctorProfile.fees')->with('doctors',  $doctors);
    }


    //-----------
    public function feesUpdate(Request $request, $id){
        $this->validate($request, [
            'title' => 'fees',
        ]);
        $doctor = Doctor::find($id);
        $doctor->fees = $request->fees;
        $doctor->save();
        return redirect()->back();
    }
}
