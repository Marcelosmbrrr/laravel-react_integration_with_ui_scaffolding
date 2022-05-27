# Project Guide

This is a monolithic application built with Laravel and React JS.
Both are merged into a single application through the laravel/ui package, obtained with the command "composer require laravel/ui". This command provides some frontend scaffoldings that can be choosed with another command, like "php artisan ui react", that injects React into the "resources/js" folder.

The routes are not defined in the "api.php" file, but in "web.php", and for convenience each route that the frontend use for CRUD operations uses "/api" prefix, like the "api.php" file pattern.
