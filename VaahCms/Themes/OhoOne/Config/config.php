<?php

$config = array();

/*
|--------------------------------------------------------------------------
| Get Theme Settings
|--------------------------------------------------------------------------
*/
$path = __DIR__."/../settings.json";
if (File::exists($path)) {
    $file = File::get($path);
    $plugin_config = json_decode($file);
    $config = (array)$plugin_config;
}

/*
|--------------------------------------------------------------------------
| Custom Theme Settings
|--------------------------------------------------------------------------
*/

$theme_settings = [];

$config = array_merge($config, $theme_settings);

return $config;