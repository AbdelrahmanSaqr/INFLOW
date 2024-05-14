<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestData extends Model
{
    use HasFactory;
    protected $table = 'test_data';
    protected $fillable = [
        '0',
        '1',
        '2',
        '3',
        '4',
    ];
}
