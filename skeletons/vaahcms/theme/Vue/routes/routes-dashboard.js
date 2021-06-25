let routes=[];
let routes_list=[];


//----------Middleware
import GetAssets from './middleware/GetAssets'
//----------Middleware


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

import Default from './../layouts/Default'
import Index from './../pages/dashboard/Index'

routes_list =     {
    path: '/',
    component: Default,
    props: true,
    meta: {
        middleware: [
            GetAssets
        ]
    },
    children: [
        {
            path: '/',
            name: '<%= theme_name_lower %>.index',
            component: Index,
            props: true,
            meta: {
                middleware: [
                    GetAssets
                ]
            },
        },

    ]
};

routes.push(routes_list);


export default routes;
