<?php

Route::group(
    [
        'prefix' => 'backend/vikram/users',
                
                'middleware' => ['web', 'has.backend.access'],
                
                'namespace' => 'Backend',
    ],
    function () {
        /**
         * Get Assets
         */
        Route::get('/assets', 'UsersController@getAssets')
            ->name('vh.backend.vikram.users.assets');
        /**
         * Get List
         */
        Route::get('/', 'UsersController@getList')
            ->name('vh.backend.vikram.users.list');
        /**
         * Update List
         */
        Route::match(['put', 'patch'], '/', 'UsersController@updateList')
            ->name('vh.backend.vikram.users.list.update');
        /**
         * Delete List
         */
        Route::delete('/', 'UsersController@deleteList')
            ->name('vh.backend.vikram.users.list.delete');


        /**
         * Create Item
         */
        Route::post('/', 'UsersController@createItem')
            ->name('vh.backend.vikram.users.create');
        /**
         * Get Item
         */
        Route::get('/{id}', 'UsersController@getItem')
            ->name('vh.backend.vikram.users.read');
        /**
         * Update Item
         */
        Route::match(['put', 'patch'], '/{id}', 'UsersController@updateItem')
            ->name('vh.backend.vikram.users.update');
        /**
         * Delete Item
         */
        Route::delete('/{id}', 'UsersController@deleteItem')
            ->name('vh.backend.vikram.users.delete');

        /**
         * List Actions
         */
        Route::any('/action/{action}', 'UsersController@listAction')
            ->name('vh.backend.vikram.users.list.actions');

        /**
         * Item actions
         */
        Route::any('/{id}/action/{action}', 'UsersController@itemAction')
            ->name('vh.backend.vikram.users.item.action');

        //---------------------------------------------------------

        //---------------------------------------------------------
        Route::get('/item/{id}/roles', 'UsersController@getItemRoles')
            ->name('vh.backend.vikram.users.role');

        Route::post('/actions/{action_name}', 'UsersController@postActions')
            ->name('vh.backend.vikram.users.actions');
        //---------------------------------------------------------
        Route::post('/avatar/store', 'UsersController@storeAvatar')
            ->name('vh.backend.vikram.users.avatar.store');
        //---------------------------------------------------------
        Route::post('/avatar/remove', 'UsersController@removeAvatar')
            ->name('vh.backend.vikram.users.avatar.remove');
        //---------------------------------------------------------
    });
