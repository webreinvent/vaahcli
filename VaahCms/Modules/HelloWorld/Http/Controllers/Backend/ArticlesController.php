<?php namespace VaahCms\Modules\HelloWorld\Http\Controllers\Backend;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use WebReinvent\VaahCms\Models\Role;
use WebReinvent\VaahCms\Models\Setting;
use WebReinvent\VaahCms\Models\Taxonomy;
use VaahCms\Modules\HelloWorld\Models\Article;

class ArticlesController extends Controller
{
    //----------------------------------------------------------
    public function __construct()
    {
    }
    //----------------------------------------------------------
    public function getAssets(Request $request): JsonResponse
    {
        if (!Auth::user()->hasPermission('has-access-of-users-section')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $data = [];

            $data['permission'] = [];
            $data['rows'] = config('vaahcms.per_page');

            $data['fillable']['except'] = [
                'uuid',
                'created_by',
                'updated_by',
                'deleted_by',
            ];

            $model = new Article();
            $fillable = $model->getFillable();
            $data['fillable']['columns'] = array_diff(
                $fillable, $data['fillable']['except']
            );

            foreach ($fillable as $column) {
                $data['empty_item'][$column] = null;
            }

            $custom_fields = Setting::query()->where('category','user_setting')
                ->where('label','custom_fields')->first();

            $data['empty_item']['meta']['custom_fields'] = [];

            if (isset($custom_fields)) {
                foreach ($custom_fields['value'] as $custom_field) {
                    $data['empty_item']['meta']['custom_fields'][$custom_field->slug] = null;
                }
            }

            $roles_count = Role::all()->count();

            $data['actions'] = [];
            $data['name_titles'] = vh_name_titles();
            $data['countries'] = vh_get_country_list();
            $data['timezones'] = vh_get_timezones();
            $data['custom_fields'] = $custom_fields;
            $data['fields'] = Article::getUserSettings();
            $data['totalRole'] = $roles_count;
            $data['country_code'] = vh_get_country_list();
            $data['registration_statuses'] = Taxonomy::getTaxonomyByType('registrations');
            $data['upload_url'] = route('vh.backend.media.upload');
            $response['success'] = true;
            $response['data'] = $data;
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function getList(Request $request): JsonResponse
    {
        if (!Auth::user()->hasPermission('has-access-of-users-section')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $response = Article::getList($request);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }
        return response()->json($response);
    }
    //----------------------------------------------------------
    public function updateList(Request $request): JsonResponse
    {
        if (!Auth::user()->hasPermission('can-update-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $response = Article::updateList($request);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function listAction(Request $request, $type): JsonResponse
    {
        if (!Auth::user()->hasPermission('can-update-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $response = Article::listAction($request, $type);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function deleteList(Request $request): JsonResponse
    {
        try {
            $response = Article::deleteList($request);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function createItem(Request $request): JsonResponse
    {
        if(!Auth::user()->hasPermission('can-create-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $response = Article::createItem($request);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function getItem(Request $request, $id): JsonResponse
    {
        if (!Auth::user()->hasPermission('can-read-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $response = Article::getItem($id);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function updateItem(Request $request,$id): JsonResponse
    {
        if (!Auth::user()->hasPermission('can-update-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $item = Article::query()->where('id', $id)->first();

            if (!$item) {
                $response['success'] = false;
                $response['errors'] = 'Registration not found.';
                return response()->json($response);
            }

            $request['id'] = $item->id;
            $response = Article::updateItem($request);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function deleteItem(Request $request,$id): JsonResponse
    {
        if (!Auth::user()->hasPermission('can-update-users') ||
            !Auth::user()->hasPermission('can-delete-users')
        ) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $response = Article::deleteItem($request, $id);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function itemAction(Request $request,$id,$action): JsonResponse
    {
        if(!Auth::user()->hasPermission('can-manage-users') &&
            !Auth::user()->hasPermission('can-update-users')
        ) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $response = Article::itemAction($request,$id,$action);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function getItemRoles(Request $request, $id): JsonResponse
    {
        if (!Auth::user()->hasPermission('can-read-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $item = Article::withTrashed()->where('id', $id)->first();

            $response['data']['item'] = $item;

            if ($request->has("q")) {
                $list = $item->roles()->where(function ($q) use ($request){
                    $q->where('name', 'LIKE', '%'.$request->q.'%')
                        ->orWhere('slug', 'LIKE', '%'.$request->q.'%');
                });
            } else {
                $list = $item->roles();
            }

            $list->orderBy('pivot_is_active', 'desc');
            $rows = config('vaahcms.per_page');

            if ($request->rows) {
                $rows = $request->rows;
            }

            $list = $list->paginate($rows);

            foreach ($list as $role) {

                $data = Article::getPivotData($role->pivot);

                $role['json'] = $data;
                $role['json_length'] = count($data);
            }

            $response['data']['list'] = $list;
            $response['success'] = true;
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);

    }
    //----------------------------------------------------------
    public function postActions(Request $request, $action) : JsonResponse
    {
        try {
            $rules = array(
                'inputs' => 'required',
            );

            $validator = \Validator::make( $request->all(), $rules);
            if ( $validator->fails() ) {

                $errors             = errorsToArray($validator->errors());
                $response['success'] = false;
                $response['errors'][] = $errors;
                return response()->json($response);
            }

            $response = [];

            $request->merge(['action'=>$action]);

            switch ($action)
            {
                //------------------------------------
                case 'bulk-change-status':

                    if (!Auth::user()->hasPermission('can-manage-users') &&
                        !Auth::user()->hasPermission('can-update-users')
                    ) {
                        $response['success'] = false;
                        $response['errors'][] = trans("vaahcms::messages.permission_denied");

                        return response()->json($response);
                    }

                    $response = Article::bulkStatusChange($request);

                    break;
                //------------------------------------
                case 'bulk-trash':

                    if (!Auth::user()->hasPermission('can-update-users')) {
                        $response['success'] = false;
                        $response['errors'][] = trans("vaahcms::messages.permission_denied");

                        return response()->json($response);
                    }

                    $response = Article::bulkTrash($request);

                    break;
                //------------------------------------
                case 'bulk-restore':

                    if (!Auth::user()->hasPermission('can-update-users')) {
                        $response['success'] = false;
                        $response['errors'][] = trans("vaahcms::messages.permission_denied");

                        return response()->json($response);
                    }

                    $response = Article::bulkRestore($request);

                    break;
                //------------------------------------
                case 'bulk-delete':

                    if (!Auth::user()->hasPermission('can-update-users') ||
                        !Auth::user()->hasPermission('can-delete-users')
                    ) {
                        $response['success'] = false;
                        $response['errors'][] = trans("vaahcms::messages.permission_denied");

                        return response()->json($response);
                    }

                    $response = Article::bulkDelete($request);

                    break;
                //------------------------------------
                case 'toggle-role-active-status':

                    if (!Auth::user()->hasPermission('can-manage-users') &&
                        !Auth::user()->hasPermission('can-update-users')
                    ) {
                        $response['success'] = false;
                        $response['errors'][] = trans("vaahcms::messages.permission_denied");

                        return response()->json($response);
                    }

                    $response = Article::bulkChangeRoleStatus($request);

                    break;
                //------------------------------------
            }
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function getProfile(Request $request): JsonResponse
    {
        try {
            $data['profile'] = Article::query()->find(Auth::user()->id);
            $data['mfa_methods'] = config('settings.global.mfa_methods');
            $data['mfa_status'] = config('settings.global.mfa_status');

            $response['success'] = true;
            $response['data'] = $data;
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function storeAvatar(Request $request): JsonResponse
    {
        if (!Auth::user()->hasPermission('can-update-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $rules = array(
                'user_id' => 'required',
            );

            $validator = \Validator::make( $request->all(), $rules);
            if ( $validator->fails() ) {

                $errors             = errorsToArray($validator->errors());
                $response['success'] = false;
                $response['errors'][] = $errors;
                return response()->json($response);
            }

            $response = Article::storeAvatar($request, $request->user_id);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function removeAvatar(Request $request)
    {

        if (!Auth::user()->hasPermission('can-update-users')) {
            $response['success'] = false;
            $response['errors'][] = trans("vaahcms::messages.permission_denied");

            return response()->json($response);
        }

        try {
            $rules = array(
                'user_id' => 'required',
            );

            $validator = \Validator::make( $request->all(), $rules);
            if ( $validator->fails() ) {
                $errors = errorsToArray($validator->errors());
                $response['success'] = false;
                $response['errors'][] = $errors;
                return response()->json($response);
            }

            $response = Article::removeAvatar($request->user_id);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['messages'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function storeProfile(Request $request): JsonResponse
    {
        try {
            $response = Article::storeProfile($request);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if(env('APP_DEBUG')){
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function storeProfilePassword(Request $request): JsonResponse
    {
        try {
            $response = Article::storePassword($request);

            if ($response['success'] === true) {
                Auth::logout();

                $response['data']['redirect_url'] = route('vh.backend');
            }
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if (env('APP_DEBUG')) {
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function storeProfileAvatar(Request $request): JsonResponse
    {
        try {
            $response = Article::storeAvatar($request);
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if (env('APP_DEBUG')) {
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
    public function removeProfileAvatar(Request $request): JsonResponse
    {
        try {
            $response = Article::removeAvatar();
        } catch (\Exception $e) {
            $response = [];
            $response['success'] = false;

            if (env('APP_DEBUG')) {
                $response['errors'][] = $e->getMessage();
                $response['hint'][] = $e->getTrace();
            } else {
                $response['errors'][] = 'Something went wrong.';
            }
        }

        return response()->json($response);
    }
    //----------------------------------------------------------
}
