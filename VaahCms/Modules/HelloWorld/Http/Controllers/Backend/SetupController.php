<?php  namespace VaahCms\Modules\HelloWorld\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class SetupController extends Controller
{

    public function __construct()
    {
    }

    /**
     * Run when module is activated
     */
    public static function activate($module)
    {
        $response['success'] = true;
        $response['data'] = [];
        return vh_response($response);
    }

    /**
     * Run when module is activated
     */
    public static function dependencies()
    {
        $response['success'] = true;
        $response['data']['modules'] = [];
        $response['data']['themes'] = [];

        return vh_response($response);
    }

    /**
     * Run when module is deactivate
     */
    public static function deactivate()
    {

        $response['success'] = true;
        $response['data'] = [];
        return vh_response($response);

    }

    /**
     * Run when module's sample data link is clicked
     */
    public static function importSampleData()
    {

        $response['success'] = true;
        $response['data'] = [];
        return vh_response($response);

    }

    /**
     * Run when module is deleted
     */
    public static function delete()
    {

        $response['success'] = true;
        $response['data'] = [];
        return vh_response($response);

    }


}
