# IdeaFactory
Pinterest clone with some small modifications (meant for learning purposes)

# Install (local)
Composer is required. Install composer here.

Install required bins and vendor packages

    $ composer global require 'laravel/installer'
    $ composer update

Populate environment config

    $ echo "APP_ENV=local\nAPP_DEBUG=true\nAPP_NAME=IdeaFactory\nDB_DATABASE=database/ideafactory.db" > .env
    $ php artisan key:generate

Seed database with mock data

    $ sqlite3 database/ideafactory.db 'VACUUM;'
    $ php artisan migrate:refresh --seed

Run application
    
    $ php artisan serve
