<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\ArticalController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\ProfilleController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/test', function () {
    return view('test');
});



//group dashboard

//main body
Route::get('/', function () {
    return view('layouts/main');
});

//example
Route::get('/body', function () {
    return view('body_test/test');
})->name('HOME');

//login
Route::group([
    'middleware' => 'api',

], function ($router) {
    Auth::routes();
});


//Routes for configuration doctor controller
Route::get('/configs', [ConfigurationController::class, 'index'])->name('configs');            // show all
Route::get('/config/create', [ConfigurationController::class, 'create'])->name('config.create'); // create new
Route::post('/config/store', [ConfigurationController::class, 'store'])->name('config.store'); // store in database
Route::get('/config/show/{slug}', [ConfigurationController::class, 'show'])->name('config.show');  // show 1
Route::get('/config/{id}', [ConfigurationController::class, 'edit'])->name('config.edit');         // action edit
Route::post('/config/update/{id}', [ConfigurationController::class, 'update'])->name('config.update'); // update 1
Route::delete('/config/destroy/{id}', [ConfigurationController::class, 'destroy'])->name('config.destroy'); // delete



//Routes for appointments controller
Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments');            // show all
Route::get('/appointment/create', [AppointmentController::class, 'create'])->name('appointment.create'); // create new
Route::post('/appointment/store', [AppointmentController::class, 'store'])->name('appointment.store'); // store in database
Route::get('/appointment/show/{id}', [AppointmentController::class, 'show'])->name('appointment.show');  // show 1
Route::get('/appointment/{id}', [AppointmentController::class, 'edit'])->name('appointment.edit');         // action edit
Route::post('/config/appointment/{id}', [AppointmentController::class, 'update'])->name('appointment.update'); // update 1
Route::delete('/appointment/destroy/{id}', [AppointmentController::class, 'destroy'])->name('appointment.destroy'); // delete


//Routes for Articals
Route::get('/articals', [ArticalController::class, 'index'])->name('articals');           // show all
Route::get('/artical/create', [ArticalController::class, 'create'])->name('artical.create'); // create new
Route::post('/artical/store', [ArticalController::class, 'store'])->name('artical.store'); // store in database
Route::get('/artical/show/{slug}', [ArticalController::class, 'show'])->name('artical.show');  // show 1
Route::get('/artical/{id}', [ArticalController::class, 'edit'])->name('artical.edit');         // action edit
Route::post('/artical/update/{id}', [ArticalController::class, 'update'])->name('artical.update'); // update 1
Route::delete('/artical/destroy/{id}', [ArticalController::class, 'destroy'])->name('artical.destroy'); // delete


//Doctor Profile
Route::get('/doctor-profile', [ProfilleController::class, 'index'])->name('doctorProfile');           // show all
Route::post('/doctor-profile/store', [ProfilleController::class, 'update'])->name('doctorProfile.update'); // store in database
Route::get('/doctor/fees', [ProfilleController::class, 'fees'])->name('doctorFees');
Route::post('/doctor/fees/update/{id}', [ProfilleController::class, 'feesUpdate'])->name('doctorFees.update');


Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//Route::get('/main', [App\Http\Controllers\HomeController::class, 'main'])->name('main');

Route::get('/layout', function () {
    return view('layouts/app');
});


//Route::get('/app', [App\Http\Controllers\Api\AppointmentController::class, 'index'])->name('app');
//Route::get('/appointments', [AppointmentController::class, 'index']);
