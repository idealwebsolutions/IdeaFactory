<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'provider_id' => $faker->randomNumber(5),
        'display_name' => $faker->name,
        'avatar' => $faker->imageUrl,
        'email' => $faker->unique()->safeEmail,
        'client_ip_address' => $faker->ipv4(),
        'remember_token' => str_random(10),
    ];
});
