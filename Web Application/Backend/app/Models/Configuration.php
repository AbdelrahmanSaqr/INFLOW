<?php

namespace App\Models;

use App\Models\Doctor;
use App\Models\Secretary;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Configuration extends Model
{
    use HasFactory;

    protected $table = 'configuration_doctors';

    protected $fillable = [
        'doctor_id',
        'day',
        'from',
        'to',
        'fees',
        'location',
        'type',
        'secretary_id',
        'slug',
    ];
    protected $dates = ['from', 'to'];
    /**
     * Get the user that owns the Configuration
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }
     /**
     * Get the user that owns the Configuration
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function secretary(): BelongsTo
    {
        return $this->belongsTo(Secretary::class, 'secretary_id');
    }
}
