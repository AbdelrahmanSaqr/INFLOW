<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
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
        $doctor = Doctor::where('user_id', '=', Auth::id())->first();
        $doctor_id = $doctor->id;
        $today = date('Y-m-d');
        $day_after = date('Y-m-d', strtotime('+6 days', strtotime($today))); // get 6 days after
        $appointments = Appointment::where('doctor_id', $doctor_id)
            ->where('date', '>=', $today)
            ->where('date', '<=', $day_after)
            ->join('configuration_doctors', 'appointments.config_id', '=', 'configuration_doctors.id')
            ->orderBy('appointments.date')
            ->orderBy('configuration_doctors.from')
            ->get();
        return view('appointment.index')->with('appointment', $appointments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
