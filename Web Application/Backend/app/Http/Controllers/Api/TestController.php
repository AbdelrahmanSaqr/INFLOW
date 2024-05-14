<?php

namespace App\Http\Controllers\Api;

use App\Models\Test;
use App\Models\User;
use App\Models\Patient;
use App\Models\Problem;
use App\Models\TestData;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TestController extends Controller
{
    use ApiResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function view(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'res_num' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        // -------------
        // convert [3,2,1,0,4] to 32104
        $resNumInput = $request->input('res_num');
        $resNumArray = is_array($resNumInput) ? $resNumInput : str_split($resNumInput);

        // Convert array to string
        $numbers = implode('', $resNumArray);
        $numbers = str_replace(['[', ']', ','], '', $numbers);
        // check if record already exists
        $existingTest = Test::where('result', $numbers)->first();
        // save result
        $patient = patient::where('user_id', '=', Auth::id())->first();
        if (!$existingTest) {
            $test = Test::create([
                'type' => 1,
                'result' => $numbers,

            ]);
            $test->patients()->attach($patient->id);
        } else {
            $existingTest->patients()->attach($patient->id);
        }

        // -------------
        //show text result
        $res_text = [];
        $cont = 1;
        for ($i = 1; $i <= 10; $i++) {
            if ($cont == 11) {
                $cont = 1;
            }
            $data_res = TestData::where('id', $i)->pluck($request->res_num[$cont]); // [1,2,3,4,5]
            $res_text[] = $data_res;
            $cont = $cont + 2;
        }
        if ($res_text) {
            return $this->apiResponse($res_text, 'ok', 200);
        }
        return $this->apiResponse(null, 'the restData not found', 404);
    }

    /**
     * Show the form for questions the specified resource.
     */
    public function questions(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gender' => 'required',
            'age' => 'required',
            'status' => 'required',
            'therapy' => 'required',
            'problem' => 'required|array',
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        // -------------

        $patient = patient::where('user_id', '=', Auth::id())->first();
        // check if record already exists
        $problems = $request->input('problem');

        foreach ($problems as $problem) {
            $existingProblem = Problem::where('type', $problem)->first();

            if (!$existingProblem) {
                // Create the problem if it doesn't exist
                $problem = Problem::create([
                    'type' => $problem,

                ]);
                $problem->patients()->attach($patient->id);
            } else {
                $existingProblem->patients()->attach($patient->id);
            }
        }
        // save result
        // save data
        $patient->gender = $request->gender;
        $patient->age = $request->age;
        $patient->status = $request->status;
        $patient->therapy = $request->therapy;
        $patient->save();

        return $this->apiResponse($patient, 'ok', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
}
