<?php

use Faker\Generator as Faker;

$factory->define(App\Board::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'tags' => implode(',', $faker->words()),
        'owner' => 0
    ];
});
