<?php namespace VaahCms\Modules\Vikram\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class BackendController extends Controller
{


    public function __construct()
    {

    }

    public function index(Request $request)
    {


        /**
         * Check user has permission else redirect
         */
        /*
        $permission_slug = 'has-access-vikram';
        if(!\Auth::user()->hasPermission($permission_slug))
        {
            $error_message = trans("vaahcms::messages.permission_denied");
            if(env('APP_DEBUG'))
            {
                $error_message .= ' Permission Slug: '.$permission_slug;
            }
            $response['errors'][] = $error_message;
            return redirect('vh.backend')->withErrors($response['errors']);
        }
        */

        
        return view('vikram::backend.pages.app');
        


    }

    public function getAssets(Request $request)
    {

        /**
         * Check user has permission else return permission denied error
         */

        /*
        $permission_slug = 'has-access-vikram';
        if(!\Auth::user()->hasPermission($permission_slug))
        {
            $response['success'] = false;
            $error_message = trans("vaahcms::messages.permission_denied");
            if(env('APP_DEBUG'))
            {
                $error_message .= ' Permission Slug: '.$permission_slug;
            }
            $response['errors'][] = $error_message;
            return vh_response($response);
        }
        */

        $data=[];

        $data['module'] = [
            'name' => config('vikram.name'),
            'version' => config('vikram.version')
        ];

        $data['timezone'] = env("APP_TIMEZONE");
        $data['server_date_time'] = \Carbon::now();

        $response['success'] = true;
        $response['data'] = $data;

        return vh_response($response);

    }

}
