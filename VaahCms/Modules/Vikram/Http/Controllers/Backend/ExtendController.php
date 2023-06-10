<?php  namespace VaahCms\Modules\Vikram\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ExtendController extends Controller
{

    //----------------------------------------------------------
    public function __construct()
    {
    }
    //----------------------------------------------------------
    public static function topLeftMenu()
    {
        $links = [];

        $response['success'] = true;
        $response['data'] = $links;

        return vh_response($response);

    }
    //----------------------------------------------------------
    public static function topRightUserMenu()
    {
        $links = [];

        $response['success'] = true;
        $response['data'] = $links;

        return vh_response($response);
    }
    //----------------------------------------------------------
    public static function sidebarMenu()
    {
        $links = [];


        $links[0] = [
            'icon' => 'cubes',
            'label'=> 'Vikram',
            'link'=> route('vh.backend.vikram')
        ];


        if(version_compare(config('vaahcms.version'), '2.0.0', '<' )){
            $links[0]['link'] = route('vh.backend.vikram');
        } else{
            $links[0]['url'] = route('vh.backend.vikram');
        }


        $response['success'] = true;
        $response['data'] = $links;

        return vh_response($response);
    }
    //----------------------------------------------------------

}
