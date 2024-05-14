<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'doctor'=> $this->doctor->user->name,
            'title'=>$this->title,
            'body'=> $this->body,
            'img'=>$this->img,
            'description'=>$this->description,
        ];

    }
}
