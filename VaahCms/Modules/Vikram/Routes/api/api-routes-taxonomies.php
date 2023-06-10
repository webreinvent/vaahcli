<?php


Route::group(
    [
        'prefix' => 'vikram/taxonomies',
        'middleware' => ['auth:api'],
        'namespace' => 'Backend',
    ],
    function () {
        //---------------------------------------------------------
        Route::get('/assets', 'TaxonomiesController@getAssets')
        ->name('vh.backend.vikram.api.taxonomies.assets');
        //---------------------------------------------------------
        Route::get('/', 'TaxonomiesController@getList')
        ->name('vh.backend.vikram.api.taxonomies.list');
        //---------------------------------------------------------
        Route::match(['put', 'patch'], '/', 'TaxonomiesController@updateList')
        ->name('vh.backend.vikram.api.taxonomies.list.updates');
        //---------------------------------------------------------
        Route::delete('/', 'TaxonomiesController@deleteList')
        ->name('vh.backend.vikram.api.taxonomies.list.delete');
        //---------------------------------------------------------
        Route::post('/', 'TaxonomiesController@createItem')
        ->name('vh.backend.vikram.api.taxonomies.create');
        //---------------------------------------------------------
        Route::get('/{id}', 'TaxonomiesController@getItem')
        ->name('vh.backend.vikram.api.taxonomies.read');
        //---------------------------------------------------------
        Route::match(['put', 'patch'], '/{id}', 'TaxonomiesController@updateItem')
        ->name('vh.backend.vikram.api.taxonomies.update');
        //---------------------------------------------------------
        Route::delete('/{id}', 'TaxonomiesController@deleteItem')
        ->name('vh.backend.vikram.api.taxonomies.delete');
        //---------------------------------------------------------
    });
