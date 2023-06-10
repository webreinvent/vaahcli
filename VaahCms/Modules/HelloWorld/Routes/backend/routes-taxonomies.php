<?php

Route::group(
    [
       'prefix' => 'backend/helloworld/taxonomies',
        
        'middleware' => ['web', 'has.backend.access'],
        
        'namespace' => 'Backend',
],
function () {
    /**
     * Get Assets
     */
    Route::get('/assets', 'TaxonomiesController@getAssets')
        ->name('vh.backend.helloworld.taxonomies.assets');
    /**
     * Get List
     */
    Route::get('/', 'TaxonomiesController@getList')
        ->name('vh.backend.helloworld.taxonomies.list');
    /**
     * Update List
     */
    Route::match(['put', 'patch'], '/', 'TaxonomiesController@updateList')
        ->name('vh.backend.helloworld.taxonomies.list.update');
    /**
     * Delete List
     */
    Route::delete('/', 'TaxonomiesController@deleteList')
        ->name('vh.backend.helloworld.taxonomies.list.delete');


    /**
     * Create Item
     */
    Route::post('/', 'TaxonomiesController@createItem')
        ->name('vh.backend.helloworld.taxonomies.create');
    /**
     * Get Item
     */
    Route::get('/{id}', 'TaxonomiesController@getItem')
        ->name('vh.backend.helloworld.taxonomies.read');
    /**
     * Get List by type id
     */
    Route::get('/type/{id}', 'TaxonomiesController@getListByTypeId')
        ->name('vh.backend.helloworld.taxonomies.type.id');
    /**
     * Update Item
     */
    Route::match(['put', 'patch'], '/{id}', 'TaxonomiesController@updateItem')
        ->name('vh.backend.helloworld.taxonomies.update');
    /**
     * Delete Item
     */
    Route::delete('/{id}', 'TaxonomiesController@deleteItem')
        ->name('vh.backend.helloworld.taxonomies.delete');

    /**
     * List Actions
     */
    Route::any('/action/{action}', 'TaxonomiesController@listAction')
        ->name('vh.backend.helloworld.taxonomies.list.actions');

    /**
     * Item actions
     */
    Route::any('/{id}/action/{action}', 'TaxonomiesController@itemAction')
        ->name('vh.backend.helloworld.taxonomies.item.action');


    /**
     * Create taxonomy type
     */
    Route::post( '/create-taxonomy-type', 'TaxonomiesController@createTaxonomyType' )
        ->name( 'vh.backend.helloworld.taxonomies.createTaxonomyType' );

    /**
     * Delete taxonomy type
     */
    Route::post( '/delete-taxonomy-type', 'TaxonomiesController@deleteTaxonomyType' )
        ->name( 'vh.backend.helloworld.taxonomies.deleteTaxonomyType' );

    /**
     * Update taxonomy type
     */
    Route::post( '/update-taxonomy-type', 'TaxonomiesController@updateTaxonomyType' )
        ->name( 'vh.backend.helloworld.taxonomies.updateTaxonomyType' );

    /**
     * Update taxonomy type positions
     */
    Route::post( 'update-taxonomy-type-position', 'TaxonomiesController@updateTaxonomyTypePosition' )
        ->name( 'vh.backend.helloworld.taxonomies.updateTaxonomyTypePosition' );

    /**
     * Get parent
     */
    Route::get('/json/parents/{id}/{name?}', 'TaxonomiesController@getParents' )
        ->name( 'vh.backend.helloworld.taxonomies.countries' );

    /**
     * Get country by ID
     */
    Route::get( 'json/getCountryById/{id}', 'TaxonomiesController@getCountryById' )
        ->name( 'vh.backend.helloworld.taxonomies.getCountryById' );
    //---------------------------------------------------------

});
