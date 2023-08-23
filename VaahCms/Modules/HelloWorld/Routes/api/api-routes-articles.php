<?php

/*
 * API url will be: <base-url>/public/api/helloworld/articles
 */
Route::group(
    [
        'prefix' => 'helloworld/articles',
        'namespace' => 'Backend',
    ],
function () {

    /**
     * Get Assets
     */
    Route::get('/assets', 'ArticlesController@getAssets')
        ->name('vh.backend.helloworld.api.articles.assets');
    /**
     * Get List
     */
    Route::get('/', 'ArticlesController@getList')
        ->name('vh.backend.helloworld.api.articles.list');
    /**
     * Update List
     */
    Route::match(['put', 'patch'], '/', 'ArticlesController@updateList')
        ->name('vh.backend.helloworld.api.articles.list.update');
    /**
     * Delete List
     */
    Route::delete('/', 'ArticlesController@deleteList')
        ->name('vh.backend.helloworld.api.articles.list.delete');


    /**
     * Create Item
     */
    Route::post('/', 'ArticlesController@createItem')
        ->name('vh.backend.helloworld.api.articles.create');
    /**
     * Get Item
     */
    Route::get('/{id}', 'ArticlesController@getItem')
        ->name('vh.backend.helloworld.api.articles.read');
    /**
     * Update Item
     */
    Route::match(['put', 'patch'], '/{id}', 'ArticlesController@updateItem')
        ->name('vh.backend.helloworld.api.articles.update');
    /**
     * Delete Item
     */
    Route::delete('/{id}', 'ArticlesController@deleteItem')
        ->name('vh.backend.helloworld.api.articles.delete');

    /**
     * List Actions
     */
    Route::any('/action/{action}', 'ArticlesController@listAction')
        ->name('vh.backend.helloworld.api.articles.list.action');

    /**
     * Item actions
     */
    Route::any('/{id}/action/{action}', 'ArticlesController@itemAction')
        ->name('vh.backend.helloworld.api.articles.item.action');



});
