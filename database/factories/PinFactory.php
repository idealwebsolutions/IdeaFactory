<?php

use Faker\Generator as Faker;

$factory->define(App\Pin::class, function (Faker $faker) {
    return [
        'author' => 1,
        'board' => $faker->numberBetween(1, 3),
        'title' => substr($faker->sentence(2), 0, -1),
        'url' => $faker->url,
        'likes' => $faker->unique()->randomNumber(3),
        'content' => $faker->imageUrl(
          $faker->numberBetween(400, 600),
          $faker->numberBetween(400, 600)
        ),
    ];
});
