<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($this->user->type != 'admin') {
            return [
                'id' => $this->id,
                'name'=> $this->user->name,
                'phone_num'=>$this->user->phone_num,
                'img'=>$this->user->img,
                'info' => $this->info,
                'bio' => $this->bio,
                'fees'=>$this->fees,
            ];
        }
        return [];

    }
}
