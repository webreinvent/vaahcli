<?php

Route::group(
[
 'prefix' => 'routes',
 'middleware' => ['web'],
],
function () {
     //---------------------------------------------------------
     Route::get('/', 'RoutesController@getIndex')
    ->name('routes.index');
     //---------------------------------------------------------
     Route::any('/assets', 'RoutesController@getAssets')
    ->name('routes.assets');
     //---------------------------------------------------------
     Route::post('/create', 'RoutesController@postCreate')
    ->name('routes.create');
     //---------------------------------------------------------
     Route::any('/list', 'RoutesController@getList')
    ->name('routes.list');
     //---------------------------------------------------------
     Route::any('/item/{uuid}', 'RoutesController@getItem')
    ->name('routes.item');
     //---------------------------------------------------------
     Route::post('/store/{uuid}', 'RoutesController@postStore')
    ->name('routes.store');
     //---------------------------------------------------------
     Route::post('/actions/{action_name}', 'RoutesController@postActions')
    ->name('routes.actions');
     //---------------------------------------------------------
});
