<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user for easy login
        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create additional users with verified emails
        $users = User::factory(5)->create([
            'email_verified_at' => now(),
        ]);

        // Create posts for the test user
        \App\Models\Post::factory(3)->create([
            'user_id' => $testUser->id,
        ]);

        // Create posts for each user (2-4 posts per user)
        foreach ($users as $user) {
            \App\Models\Post::factory(rand(2, 4))->create([
                'user_id' => $user->id,
            ]);
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info('Test User - Email: test@example.com, Password: password');
    }
}
