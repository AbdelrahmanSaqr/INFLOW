<?php

namespace App\Models;

use App\Models\Patient ;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class test extends Model
{
    use HasFactory;

    protected $table = 'tests';
    protected $fillable = [
        'type',
        'result',
    ];

    /**
     * The roles that belong to the test
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function patients(): BelongsToMany
    {
        return $this->belongsToMany(Patient::class);
    }
}
