<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class appointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'app_id' => $this->id,
            'patient_id'=>$this->patient->id,
            'date' => $this->date,
            //'note' => $this->note,
            'name' => $this->patient->user->name,
            'phone_num' => $this->patient->user->phone_num,
            'patient_img' => $this->patient->user->img,
            'age' =>$this->patient->age,
            'current_city' =>$this->patient->current_city,
            'original_city' =>$this->patient->original_city,
            'gender' =>$this->patient->gender,
            'status' =>$this->patient->status,
            'email' =>$this->patient->user->email,
        ];
    }
}
