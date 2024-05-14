<?php

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\ArticalController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AppointmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//-----------
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    //forgot password
    Route::post('/forgot-password', [ProfileController::class,'forgotPassword']);
    Route::post('/reset-password', [ProfileController::class,'resetPassword']);
});





Route::middleware(['jwt.verify'])->group(function () {
    //appointment
    Route::get('/appointments', [AppointmentController::class, 'index']); // show all data
    Route::get('/doctors', [AppointmentController::class, 'doctorView']); // show all doctors
    Route::get('/appointment/show', [AppointmentController::class, 'show']); // store appointment
    Route::post('/appointment/store', [AppointmentController::class, 'store']); // store appointment
    //test
    Route::post('/test/view', [TestController::class, 'view']);

    //question before test
    Route::post('/questions', [TestController::class, 'questions']); // save questions data
    //------------------------------
    //mobile apis
    Route::get('/doctor_appointments', [AppointmentController::class, 'doctorAppointments']); // to mobile app
    Route::get('/appointment/{id}', [AppointmentController::class, 'showDoctorAppointment']); // show 1
    Route::post('/appointment/note', [AppointmentController::class, 'note']); // insert note
    Route::get('/patientAppointments/{id}', [AppointmentController::class, 'previousAppointment']); // show 1
    // ----------------------
    //doctor
    Route::get('/doctor/profile', [ProfileController::class, 'doctorProfile']); //doctor profile
    Route::post('/doctor/profile/edit', [ProfileController::class, 'editProfile']); // update doctor profile
    Route::get('/doctors/search', [AppointmentController::class, 'search']); // search doctors
    Route::get('/doctors/search/patient', [AppointmentController::class, 'searchPatientName']); // search doctors
});


//articals
Route::get('/articals', [ArticalController::class, 'index']); // show all data
Route::get('/artical/{id}', [ArticalController::class, 'show']); // show 1
Route::Post('/artical', [ArticalController::class, 'store']); // insert artical
Route::get('/articals/search', [ArticalController::class, 'search']); // search articals
