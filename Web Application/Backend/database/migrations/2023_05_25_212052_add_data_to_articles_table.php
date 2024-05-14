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
    {
        DB::table('articles')->insert([
            [
                'id' => 1,
                'title' => 'Nature: being in the nature will help you deal with your emotions and feelings',
                'body' => 'Think about the last time you were busted for being on your phone while you were supposed to be doing something objectively more important. The shame comes in hot, followed quickly by resentment. You didn’t mean to be on your phone, after all! You were just checking the time! It wasn’t your fault that seconds later you were surreptitiously watching a video of baby ducks seeing water for the first time. Curse those baby ducks!

Our phones are portals to wonder and knowledge.But as we spend more time with these magic portals in our back pockets—and follow along with the research on this topic—we learn about how this convenience gets in the way of many IRL activities. Few understand this better than Nir Eyal, who has explored the issue from every angle, first in Hooked: How to Build Habit-Forming Products and most recently in Indistractable: How to Control Your Attention and Choose Your Life.

Here, he focuses on how to approach your phone with the right amount of skepticism, balance, and control. Read on as he debunks some of the more extreme ills of technology while illuminating some of the more depressing ones. You’ll also find plans for monitoring and working through your own habits—no flip phone required.

Here, he focuses on how to approach your phone with the right amount of skepticism, balance, and control. Read on as he debunks some of the more extreme ills of technology while illuminating some of the more depressing ones. You’ll also find plans for monitoring and working through your own habits—no flip phone required.

Here, he focuses on how to approach your phone with the right amount of skepticism, balance, and control. Read on as he debunks some of the more extreme ills of technology while illuminating some of the more depressing ones. You’ll also find plans for monitoring and working through your own habits—no flip phone required.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667087.png',
                'doctor_id' => 2,
                'created_at' => '2023-05-09 18:18:07',
                'updated_at' => '2023-05-09 18:18:07'
            ],
            [
                'id' => 2,
                'title' => 'Mental Health',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667517.png',
                'doctor_id' => 3,
                'created_at' => '2023-05-09 18:25:17',
                'updated_at' => '2023-05-09 18:25:17'
            ],
            [
                'id' => 3,
                'title' => 'Social Psychology',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667545.png',
                'doctor_id' => 3,
                'created_at' => '2023-05-09 18:25:45',
                'updated_at' => '2023-05-09 18:25:45'
            ],
            [
                'id' => 4,
                'title' => 'Modern Life',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667561.png',
                'doctor_id' => 2,
                'created_at' => '2023-05-09 18:26:01',
                'updated_at' => '2023-05-09 18:26:01'
            ],
            [
                'id' => 5,
                'title' => 'Creativity',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667587.png',
                'doctor_id' => 2,
                'created_at' => '2023-05-09 18:26:27',
                'updated_at' => '2023-05-09 18:26:27'
            ],
            [
                'id' => 6,
                'title' => 'Personality',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667606.png',
                'doctor_id' => 3,
                'created_at' => '2023-05-09 18:26:46',
                'updated_at' => '2023-05-09 18:26:46'
            ],
            [
                'id' => 7,
                'title' => 'Success and Failure',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667622.png',
                'doctor_id' => 2,
                'created_at' => '2023-05-09 18:27:02',
                'updated_at' => '2023-05-09 18:27:02'
            ],

            [
                'id' => 8,
                'title' => 'Maths and Statisitcs',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667664.png',
                'doctor_id' => 2,
                'created_at' => '2023-05-09 18:27:44',
                'updated_at' => '2023-05-09 18:27:44'
            ],
            [
                'id' => 9,
                'title' => 'Body Image',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667691.png',
                'doctor_id' => 3,
                'created_at' => '2023-05-09 18:28:11',
                'updated_at' => '2023-05-09 18:28:11'
            ],
            [
                'id' => 10,
                'title' => 'Life Hacking',
                'body' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                'description' => 'Read how nature affects your emotions and feelings in a way that affect your decisions and life and how to control this feeling in effective ways.',
                'img' => 'img/articals/1683667716.png',
                'doctor_id' => 2,
                'created_at' => '2023-05-09 18:28:36',
                'updated_at' => '2023-05-09 18:28:36'
            ]
        ]);
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove the inserted data from the table
        DB::table('articles')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])->delete();
    }
};
