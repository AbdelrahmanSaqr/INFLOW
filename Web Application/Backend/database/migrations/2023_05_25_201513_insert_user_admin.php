<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    { DB::table('users')->insert([
        [
            'id' => 1,
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => null,
            'password' => '$2y$10$ymtgB6d.mZO75GOMmzUMsu/tWJQlcSCmvX9Nar70ykOIDYSa1Ddv2',
            'phone_num' => null,
            'img' => 'img/articals/1683667622.png',
            'remember_token' => 'DsP4SK7Cq0o3rHU7yBmAjI6J1sLwp9sTuqfeFUK3XNggQD6VnT61KGLDnAu8',
            'type' => 'admin',
            'created_at' => '2023-05-03 00:37:15',
            'updated_at' => '2023-05-19 09:06:48'
        ],
        [
            'id' => 2,
            'name' => 'Iman Ibrahim',
            'email' => 'iman@gmail.com',
            'email_verified_at' => null,
            'password' => '$2y$10$K3LmkQGAlZGLYOKkLAh9VeDM5YtRhykUU.phE7CsMvWXjAxN5wa..',
            'phone_num' => '01144840869',
            'img' => 'img/doctors/1682655232.jpeg',
            'remember_token' => null,
            'type' => 'doctor',
            'created_at' => '2023-05-08 11:28:39',
            'updated_at' => '2023-05-09 21:01:46'
        ],
        [
            'id' => 3,
            'name' => 'Nesma Elrayes',
            'email' => 'nesma@gmail.com',
            'email_verified_at' => null,
            'password' => '$2y$10$WoVko29Zji.6nfT1AfxXXeFfWoKFRgjTyVKvHj1ClyR8K2RW3upiS',
            'phone_num' => '01144840869',
            'img' => 'img/doctors/1682655240.jpeg',
            'remember_token' => null,
            'type' => 'doctor',
            'created_at' => '2023-05-08 11:29:41',
            'updated_at' => '2023-05-09 21:02:01'
        ],
        [
            'id' => 4,
            'name' => 'secretary',
            'email' => 'secretary@gmail.com',
            'email_verified_at' => null,
            'password' => '$2y$10$tiAeMIyoYAPB5EqYDhGoHeOUP.0b0Y5NCtsto8gN8pHzgvyYpRGHy',
            'phone_num' => null,
            'img' => 'img/articals/1683667622.png',
            'remember_token' => 'qzPVVyKmUXeS2DzqJiRibYfZu3OZVi4vLWdlJKCrFK73BGKP0Ub9zzjVB3nt',
            'type' => 'secretary',
            'created_at' => '2023-04-08 10:40:22',
            'updated_at' => '2023-05-23 14:43:40'
        ]
    ]);
    DB::table('doctors')->insert([
        [
            'id' => 1,
            'user_id' => 1,
            'info' => 'admin admin',
            'fees' => null,
            'bio' => 'admin'
        ],
        [
            'id' => 2,
            'user_id' => 2,
            'info' => 'Lorem4 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            'fees' => 300,
            'bio' => 'The quality of your life is determined by the quality of your thoughts'
        ],
        [
            'id' => 3,
            'user_id' => 3,
            'info' => 'Lorem5 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            'fees' => 500,
            'bio' => 'The future belongs to those who believe in the beauty of their dreams'
        ],
    ]);

    //secretly
    DB::table('secretaries')->insert([
        [
            'id' => 1,
            'user_id' => 4
        ]
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove the inserted data if needed
        DB::table('users')->whereIn('id', [1,2,3,4])->delete();
        // Remove the inserted data if needed
        DB::table('doctors')->whereIn('id', [1,2,3])->delete();
        // Remove the inserted data if needed
        DB::table('secretaries')->whereIn('id', [1])->delete();
    }
};
