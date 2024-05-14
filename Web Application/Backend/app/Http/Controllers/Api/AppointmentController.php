<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Models\Configuration;
use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ConfigResource;
use App\Http\Resources\DoctorResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AppointmentResource;
use App\Http\Controllers\Api\ApiResponseTrait;

class AppointmentController extends Controller
{

    use ApiResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $config =  ConfigResource::collection(Configuration::get());
        $app =  Appointment::get();

        return $this->apiResponse($config, 'ok', 200); //PostResource:tore turn same of data

    }
    //-----------
    // view doctors
    public function doctorView()
    {
        $doctors =  DoctorResource::collection(Doctor::get());
        // DB::table('doctors')
        // ->join('users', 'users.id', '=', 'doctors.user_id')
        // ->select('*')
        // ->where('users.type', '!=', 'admin')
        // ->get()
        return $this->apiResponse($doctors, 'ok', 200); //PostResource:tore turn same of data
    }

    // search doctor
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        // -------------
        $searchQuery = $request->search;
        $keywords = explode(' ', $searchQuery);

        $query = User::query();

        foreach ($keywords as $keyword) {
            $query->orWhere('name', 'LIKE', "%$keyword%");
        }
        $user = $query->first();
        if($user){
        $doctor = Doctor::where('user_id', '=', $user->id)->first();
        $doctors = new DoctorResource($doctor);
        return $this->apiResponse($doctors, '', 200);
        }else{
            return $this->apiResponse(Null, 'no doctors', 404);

        }
    }
    //----------------
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'app_id' => 'required',
            'date' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        // -------------
        //get patient id
        $patient = Patient::where('user_id', '=', Auth::id())->first();
        $config = Configuration::find($request->app_id);
        if ($patient) {
            $appointment = Appointment::create([
                'patient_id' => $patient->id,
                'config_id' => $request->app_id,
                'date' => $request->date,
            ]);
        }
        if ($appointment) {
            return $this->apiResponse($appointment, 'saved', 201);
        }
        return $this->apiResponse(null, 'appointment not save', 400);
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    public function show(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required', // doctor id
            'start_date' => 'required', // start date
            'end_date' => 'required',   // end date
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        //--------
        $configs = Configuration::where('doctor_id', '=', $request->doctor_id)
            ->orderBy('configuration_doctors.day')
            ->orderBy('configuration_doctors.from')
            ->get();
        if ($configs) {
            $configIDs = $configs->pluck('id'); // ID for all configurations
            $appointment = Appointment::whereIn('config_id', $configIDs)
                ->where('date', '>=', $request->start_date)
                ->where('date', '<=', $request->end_date)
                ->get();

            $App_configIDs = $appointment->pluck('config_id'); // config_id for the appointments taken
            $existConfig = [];
            foreach ($configs as $config) {
                if (!$App_configIDs->contains($config->id)) {
                    $existConfig[] = $config;
                }
            }
            return $this->apiResponse(ConfigResource::collection($existConfig), 'ok', 200);
        } else {
            return $this->apiResponse(null, 'No time', 404);
        }
    }


    //---------------------------
    // mobile appointments
    public function doctorAppointments()
    {
        $doctor = Doctor::where('user_id', '=', Auth::id())->first();
        $doctor_id = $doctor->id;
        $today = date('Y-m-d');
        //$day_after = date('Y-m-d', strtotime('+6 days', strtotime($today))); // get 6 days after
        $appointments = Appointment::where('doctor_id', $doctor_id)
            ->where('date', '>=', $today)
            // ->where('date', '<=', $day_after)
            ->join('configuration_doctors', 'appointments.config_id', '=', 'configuration_doctors.id')
            ->join('patients', 'appointments.patient_id', '=', 'patients.id')
            ->join('users', 'patients.user_id', '=', 'users.id')
            ->orderBy('appointments.date')
            ->orderBy('configuration_doctors.from')
            ->select('appointments.id', 'users.name', 'users.img', 'configuration_doctors.day', 'appointments.date', 'from', 'to', 'configuration_doctors.type')
            ->get();
        return $this->apiResponse($appointments, 'done', 200);
    }

    //show 1 appointment
    public function showDoctorAppointment(string $id) // id appointment
    {
        $appointment = Appointment::find($id);
        if ($appointment) {
            $app = new AppointmentResource($appointment);

            return $this->apiResponse($app, 'ok', 200); //appointmentResource:tore turn same of data
        }
        return $this->apiResponse(null, 'the appointment not found', 404);
    }

    //show add note
    public function note(Request $request) //app_id , note
    {
        $validator = Validator::make($request->all(), [
            'app_id' => 'required', // appointment id
            'note' => 'required', // note
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        //----------------
        $appointment = Appointment::find($request->app_id);
        if ($appointment) {
            $appointment->note = $request->note;
            $appointment->save();
            return $this->apiResponse(new NoteResource($appointment), 'ok', 200);
        }
        return $this->apiResponse(null, 'the appointment not found', 404);
    }

    //show previous appointment
    public function previousAppointment(string $id) //id patient
    {
        $today = date('Y-m-d');
        $Appointments = NoteResource::collection(Appointment::where('patient_id', $id)->where('date','<',$today)->orderByDesc('appointments.date')->get()); //data // return all data
        return $this->apiResponse($Appointments, '', 200);
    }


    //search by patient name
    public function searchPatientName(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        // -------------
        $searchQuery = $request->search;
        $keywords = explode(' ', $searchQuery);

        $query = User::query();

        foreach ($keywords as $keyword) {
            $query->orWhere('name', 'LIKE', "%$keyword%");
        }
        $user = $query->first();
        if ($user) {
            $patient = Patient::where('user_id', '=', $user->id)->first();
            $appointments = Appointment::where('patient_id', $patient->id)
                ->join('configuration_doctors', 'appointments.config_id', '=', 'configuration_doctors.id')
                ->join('patients', 'appointments.patient_id', '=', 'patients.id')
                ->join('users', 'patients.user_id', '=', 'users.id')
                ->orderBy('appointments.date')
                ->orderBy('configuration_doctors.from')
                ->select('appointments.id', 'users.name', 'users.img', 'appointments.date', 'from', 'to', 'configuration_doctors.type', 'appointments.note')
                ->get();
            return $this->apiResponse($appointments, '', 200);
        }else{
            return $this->apiResponse(Null, 'not found', 404);
        }
    }
}

        //       $time1 = strtotime($config[5]->from);
        //       $time2 = strtotime($config[5]->to);
        //       return  round(abs($time2 -$time1)/3600,2);

        //     $time1 = '02:30:00';
        //     $time2 = '01:00:00';
        //    /$array1 = explode(':', $time1);
        //     $array2 = explode(':', $time2);

        //     $minutes1 = ($array1[0] * 60.0 + $array1[1]);
        //     $minutes2 = ($array2[0] * 60.0 + $array2[1]);

        //      return round(abs(strtotime($time1))/3600,2)  ;
        //      return date($config[5]->from) ;

        //---- from 3/2/2012 into -> saturday
        //$dt = Carbon::create(2012, 1, 31, 0);
        // echo $dt->format('l');
        // $to = Carbon::create(2012, 1, 4, 0);
        // echo $to->format('l');

        // 'from' => date('h:i A', $pointer),
        // 'to' => date('h:i A', $pointer + 3600),









        // $split = 1; // replace config_id
        // $appointment = [];
        // foreach ($config as $value) {
        //     $to = abs(strtotime($value->to));
        //     for ($pointer = abs(strtotime($value->from)); $pointer < $to; $pointer = $pointer + 3600) {
        //         $arrFrom = explode(':', $value->from);
        //         if ($arrFrom[1] != 00) {
        //             $pointer = $pointer + (3600 - ($arrFrom[1] * 60));
        //         }
        //         $app = [
        //             'id' => $split,
        //             'doctor_id' => $value->doctor->id,
        //             'doctor' => $value->doctor->user->name,
        //             'day' => $value->day,
        //             'from' => date('H:i', $pointer),
        //             'to' => date('H:i', $pointer + 3600),
        //             'type' => $value->type,
        //             'location' => $value->location,
        //         ];
        //         $appointment[] = $app;
        //         $split = $split + 1;




        // $date_before = date('Y-m-d', strtotime('+7 days', strtotime($request->date))); // get 6 days before
        //     $appointment = Appointment::where('date', '>', $date_before)->get();
        //     if ($appointment) {
        //         $new_config = [];
        //         // chick if the appointment is taken or not
        //         foreach ($configs as $con) {
        //             $chick = 0;
        //             foreach ($appointment as $app) {
        //                 $dt = $app->date->format('l');
        //                 if ($con->day == $dt && $con->from == $app->from) {
        //                     $chick = 1; // to chick 1=> true 0=> false
        //                 }
        //             }
        //             if ($chick == 0) {
        //                 $new_config[] = $con;
        //             }
        //         }
        //         return $this->apiResponse(ConfigResource::collection($new_config), 'ok', 200);
        //     } else {
