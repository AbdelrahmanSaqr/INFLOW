<?php

namespace App\Models;

use App\Models\Test;

use App\Models\User;
use App\Models\Problem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

//class Doctor extends Authenticatable  implements JWTSubject //model
class Patient extends Model
{
    //use  HasFactory, Notifiable, HasApiTokens;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'age',
        'current_city',
        'original_city',
        'country',
        'gender',
        'status',
        'therapy',
        'resources',
        'language',
        'problem',
    ];

 /**
     * Get the user that owns the Doctor
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The roles that belong to the Patient
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function test (): BelongsToMany
    {
        return $this->belongsToMany(Test::class);
    }

    public function problem (): BelongsToMany
    {
        return $this->belongsToMany(Problem::class);
    }

}
