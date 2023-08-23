<?php

Route::group(
    [
        'prefix' => 'backend/helloworld/articles',
        
        'middleware' => ['web', 'has.backend.access'],
        
        'namespace' => 'Backend',
],
function () {
    /**
     * Get Assets
     */
    Route::get('/assets', 'ArticlesController@getAssets')
        ->name('vh.backend.helloworld.articles.assets');
    /**
     * Get List
     */
    Route::get('/', 'ArticlesController@getList')
        ->name('vh.backend.helloworld.articles.list');
    /**
     * Update List
     */
    Route::match(['put', 'patch'], '/', 'ArticlesController@updateList')
        ->name('vh.backend.helloworld.articles.list.update');
    /**
     * Delete List
     */
    Route::delete('/', 'ArticlesController@deleteList')
        ->name('vh.backend.helloworld.articles.list.delete');


    /**
     * Fill Form Inputs
     */
    Route::any('/fill', 'ArticlesController@fillItem')
        ->name('vh.backend.helloworld.articles.fill');

    /**
     * Create Item
     */
    Route::post('/', 'ArticlesController@createItem')
        ->name('vh.backend.helloworld.articles.create');
    /**
     * Get Item
     */
    Route::get('/{id}', 'ArticlesController@getItem')
        ->name('vh.backend.helloworld.articles.read');
    /**
     * Update Item
     */
    Route::match(['put', 'patch'], '/{id}', 'ArticlesController@updateItem')
        ->name('vh.backend.helloworld.articles.update');
    /**
     * Delete Item
     */
    Route::delete('/{id}', 'ArticlesController@deleteItem')
        ->name('vh.backend.helloworld.articles.delete');

    /**
     * List Actions
     */
    Route::any('/action/{action}', 'ArticlesController@listAction')
        ->name('vh.backend.helloworld.articles.list.actions');

    /**
     * Item actions
     */
    Route::any('/{id}/action/{action}', 'ArticlesController@itemAction')
        ->name('vh.backend.helloworld.articles.item.action');

    //---------------------------------------------------------

});