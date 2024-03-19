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

import LayoutDefault from './../layouts/Default'
import Index from './../pages/dashboard/Index'

routes_list =     {
  path: '/',
  component: LayoutDefault,
  props: true,
  meta: {
    middleware: [
      GetAssets
    ]
  },
  children: [
    {
      path: '/',
      name: '<%= module_name_lower %>.index',
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
