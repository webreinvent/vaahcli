@extends(((version_compare(config('vaahcms.version'), '2.0.0', '<' )) ? 'vaahcms::backend.vaahone.layouts.backend' : 'vaahcms::backend.vaahtwo.layouts.backend' ))


@section('vaahcms_extend_backend_css')

{{--        <link href="{{vh_module_assets_url("HelloWorld", "build/index.css")}}" rel="stylesheet" media="screen">--}}

@endsection


@section('vaahcms_extend_backend_js')

    @if(env('MODULE_HELLOWORLD_ENV') == 'develop')
        <script type="module" src="http://localhost:8078/main.js"></script>
    @else
        <script type="module" src="{{vh_module_assets_url("HelloWorld", "build/index.js")}}"></script>
    @endif

@endsection

@section('content')

    <div class="primevue4">
        <div id="appHelloWorld">


        </div>
    </div>

@endsection
