<?php

Route::group(
    [
        'prefix' => 'backend/helloworld/users',
                
                'middleware' => ['web', 'has.backend.access'],
                
                'namespace' => 'Backend',
    ],
    function () {
        /**
         * Get Assets
         */
        Route::get('/assets', 'UsersController@getAssets')
            ->name('vh.backend.helloworld.users.assets');
        /**
         * Get List
         */
        Route::get('/', 'UsersController@getList')
            ->name('vh.backend.helloworld.users.list');
        /**
         * Update List
         */
        Route::match(['put', 'patch'], '/', 'UsersController@updateList')
            ->name('vh.backend.helloworld.users.list.update');
        /**
         * Delete List
         */
        Route::delete('/', 'UsersController@deleteList')
            ->name('vh.backend.helloworld.users.list.delete');


        /**
         * Create Item
         */
        Route::post('/', 'UsersController@createItem')
            ->name('vh.backend.helloworld.users.create');
        /**
         * Get Item
         */
        Route::get('/{id}', 'UsersController@getItem')
            ->name('vh.backend.helloworld.users.read');
        /**
         * Update Item
         */
        Route::match(['put', 'patch'], '/{id}', 'UsersController@updateItem')
            ->name('vh.backend.helloworld.users.update');
        /**
         * Delete Item
         */
        Route::delete('/{id}', 'UsersController@deleteItem')
            ->name('vh.backend.helloworld.users.delete');

        /**
         * List Actions
         */
        Route::any('/action/{action}', 'UsersController@listAction')
            ->name('vh.backend.helloworld.users.list.actions');

        /**
         * Item actions
         */
        Route::any('/{id}/action/{action}', 'UsersController@itemAction')
            ->name('vh.backend.helloworld.users.item.action');

        //---------------------------------------------------------

        //---------------------------------------------------------
        Route::get('/item/{id}/roles', 'UsersController@getItemRoles')
            ->name('vh.backend.helloworld.users.role');

        Route::post('/actions/{action_name}', 'UsersController@postActions')
            ->name('vh.backend.helloworld.users.actions');
        //---------------------------------------------------------
        Route::post('/avatar/store', 'UsersController@storeAvatar')
            ->name('vh.backend.helloworld.users.avatar.store');
        //---------------------------------------------------------
        Route::post('/avatar/remove', 'UsersController@removeAvatar')
            ->name('vh.backend.helloworld.users.avatar.remove');
        //---------------------------------------------------------
    });
