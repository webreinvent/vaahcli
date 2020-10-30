let routes=[];
let routes_list=[];




//----------Middleware
import GetBackendAssets from './middleware/GetBackendAssets'
//----------Middleware


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

import Backend from './../layouts/Backend'
import Index from './../pages/dashboard/Index'

routes_list =     {
    path: '/',
    component: Backend,
    props: true,
    meta: {
        middleware: [
            GetBackendAssets
        ]
    },
    children: [
        {
            path: '/',
            name: 'cms.index',
            component: Index,
            props: true,
            meta: {
                middleware: [
                    GetBackendAssets
                ]
            },
        },

    ]
};

routes.push(routes_list);

/*
|--------------------------------------------------------------------------
| Content Types Routes
|--------------------------------------------------------------------------
*/


import ContentTypeList from "./../pages/content-types/List";
import ContentTypeCreate from "./../pages/content-types/Create";
import ContentTypeView from "./../pages/content-types/View";
import ContentTypeContentStructure from "./../pages/content-types/ContentStructure";
import ContentTypeEdit from "./../pages/content-types/Edit";

routes_list =     {
    path: '/content-types',
    component: Backend,
    props: true,
    meta: {
        middleware: [
            GetBackendAssets
        ]
    },
    children: [
        {
            path: '/',
            name: 'content.types.list',
            component: ContentTypeList,
            props: true,
            meta: {
                middleware: [
                    GetBackendAssets
                ]
            },
            children: [
                {
                    path: 'create',
                    name: 'content.types.create',
                    component: ContentTypeCreate,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                },
                {
                    path: 'content-structure/:id',
                    name: 'content.types.content.structure',
                    component: ContentTypeContentStructure,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                },
                {
                    path: 'view/:id',
                    name: 'content.types.view',
                    component: ContentTypeView,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                },
                {
                    path: 'edit/:id',
                    name: 'content.types.edit',
                    component: ContentTypeEdit,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                }

            ]
        }

    ]
};

routes.push(routes_list);

/*
|--------------------------------------------------------------------------
| Contents Routes
|--------------------------------------------------------------------------
*/


import ContentsList from "./../pages/contents/List";
import ContentsCreate from "./../pages/contents/Create";
import ContentsView from "./../pages/contents/View";
import ContentsEdit from "./../pages/contents/Edit";

routes_list =     {
    path: '/contents/:slug/',
    component: Backend,
    name: 'contents',
    props: true,
    meta: {
        middleware: [
            GetBackendAssets
        ]
    },
    children: [
        {
            path: 'list',
            name: 'contents.list',
            component: ContentsList,
            props: true,
            meta: {
                middleware: [
                    GetBackendAssets
                ]
            },
            children: [
                {
                    path: 'create',
                    name: 'contents.create',
                    component: ContentsCreate,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                },
                {
                    path: 'view/:id',
                    name: 'contents.view',
                    component: ContentsView,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                },
                {
                    path: 'edit/:id',
                    name: 'contents.edit',
                    component: ContentsEdit,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                }

            ]
        }

    ]
};

routes.push(routes_list);


/*
|--------------------------------------------------------------------------
| Menus Routes
|--------------------------------------------------------------------------
*/


import MenusList from "./../pages/menus/List";
import MenusView from "./../pages/menus/View";

routes_list =     {
    path: '/menus',
    component: Backend,
    props: true,
    meta: {
        middleware: [
            GetBackendAssets
        ]
    },
    children: [
        {
            path: '/',
            name: 'menus.list',
            component: MenusList,
            props: true,
            meta: {
                middleware: [
                    GetBackendAssets
                ]
            },
            children: [
                {
                    path: 'view/:id',
                    name: 'menus.view',
                    component: MenusView,
                    props: true,
                    meta: {
                        middleware: [
                            GetBackendAssets
                        ]
                    },
                },


            ]
        }

    ]
};

routes.push(routes_list);


export default routes;
