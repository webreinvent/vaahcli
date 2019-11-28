<?php  namespace VaahCms\Theme\OhoOne\Http\Controllers;

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
        $response['status'] = 'success';
        return $response;
    }

    /**
     * Run when module is deactivate
     */
    public static function deactivate()
    {

        $response['status'] = 'success';
        return $response;

    }

    /**
     * Run when module's sample data link is clicked
     */
    public static function importSampleData()
    {

        $response['status'] = 'success';
        return $response;

    }

    /**
     * Run when module is deleted
     */
    public static function delete()
    {

        $response['status'] = 'success';
        return $response;

    }

}
