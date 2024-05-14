<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Secretary;
use Illuminate\Http\Request;
use App\Models\Configuration;
use PhpParser\Node\Stmt\Catch_;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Console\View\Components\Alert;

//use Carbon\Carbon;

class ConfigurationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $con = Configuration::orderBy('day')->orderBy('from')->get();
        //doctor data
        $doctors = Doctor::all();
        return view('configuration.index')->with('configsDoc', [$con, $doctors]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $doctors = Doctor::all();

        return view('configuration.create')->with('doctors', $doctors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate
        $this->validate($request, [
            'doctor' => 'required',
            'day' => 'required',
            'from' => 'required',
            'to' => 'required',
            //'fees' => 'required',
            'location' => 'required',
            'type' => 'required',
        ]);
        //get secretary id by auth
        $user_auth = Auth::user();
        if ($user_auth->type == 'secretary' || $user_auth->type == 'admin') {
            $auth_user = Secretary::where('user_id', $user_auth->id)->get();
            $authID = $auth_user[0]->id;
        } else {
            echo '<script language="javascript"> alert("You are not authorized") </script>';
        }

        //get doctor id
        $user = User::where('name', '=', $request->doctor)->Where('type', '=', 'doctor')->get();

        if (count($user) > 0) {
            $user_doctor = Doctor::where('user_id', $user[0]->id)->get();
            $to = abs(strtotime($request->to));
            for ($pointer = abs(strtotime($request->from)); $pointer < $to; $pointer = $pointer + 3600) {

                $arrFrom = explode(':', $request->from);
                if ($arrFrom[1] != 00) {
                    $pointer = $pointer + (3600 - ($arrFrom[1] * 60));
                }
                $config = Configuration::where([
                    'doctor_id' => $user_doctor[0]->id,
                    'day' => $request->day,
                    'from' => date('H:i', $pointer),
                    'to' => date('H:i', $pointer + 3600),
                ])->exists();
                if (!$config) {
                    Configuration::create([
                        'doctor_id' => $user_doctor[0]->id,
                        'day' => $request->day,
                        'from' => date('H:i', $pointer),
                        'to' => date('H:i', $pointer + 3600),
                        'location' => $request->location,
                        'type' => $request->type,
                        'secretary_id' => $authID,
                        'slug' => str_slug($request->day),

                    ]);
                }
            }
            return redirect()->back();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $config = Configuration::where('slug', $slug)->first();
        return view('configuration.show')->with('config', $config);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $config = Configuration::find($id);
        $doctors = Doctor::all();
        return view('configuration.update')->with('config', [$config, $doctors]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'doctor' => 'required',
            'day' => 'required',
            'from' => 'required',
            'to' => 'required',
            'location' => 'required',
            'type' => 'required',
        ]);
        $config = Configuration::find($id);
        $user = User::where('name', '=', $request->doctor)->Where('type', '=', 'doctor')->first();

        if ($user) {
            $doctor = Doctor::where('user_id', $user->id)->first();
            //if new updates already exist
            $existingConfig = Configuration::where('day', $request->day)
                ->where('from', $request->from)
                ->where('id', '!=', $id)
                ->exists();
            if (!$existingConfig) {
                $config->doctor_id = $doctor->id;
                $config->day = $request->day;
                $config->from = $request->from;
                $config->to = $request->to;
                $config->location = $request->location;
                $config->type = $request->type;
                $config->save();
            }
        } else {
            // The record already exists, show an alert or return an error message
            echo '<script language="javascript"> alert("Cannot update. Combination of day and from already exists.") </script>';
        }
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $config = Configuration::find($id);
        $config->delete($id);

        return redirect()->back();
    }
}


// connection by join
//get data by join using tables user, doctor, config
// $configs = DB::table('users')
//     ->join('doctors', 'users.id', '=', 'doctors.user_id')
//     ->join('configuration_doctors', 'doctors.doctor_id', '=', 'configuration_doctors.doctor_id')
//     ->select('configuration_doctors.config_id', 'doctors.doctor_id',  'configuration_doctors.day', 'configuration_doctors.from', 'configuration_doctors.to', 'configuration_doctors.fees', 'configuration_doctors.type', 'configuration_doctors.location')
//     ->where('users.type', '=', 'doctor')
//     ->get();
