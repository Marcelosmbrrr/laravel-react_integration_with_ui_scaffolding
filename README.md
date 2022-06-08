# Project Guide

This is a monolithic application that is beign builded with Laravel and React JS.
Both are merged into a single application through the laravel/ui package, obtained with the command "composer require laravel/ui". This command provides some frontend scaffoldings that can be choosed with another command, like "php artisan ui react", that injects React into the "resources/js" folder. 

The routes are not defined in the "api.php" file, but in "web.php", and for convenience each route that the frontend use for CRUD operations uses a custom "/api" prefix, like the "api.php" file pattern.

This way of combining technologies, with the laravel/ui package, I believe will be discontinued in the future. Alternative ways would be to use InertiaJS or Laravel as a Rest API separate from the frontend.


