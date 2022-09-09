@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_backend_css')

@endsection


@section('vaahcms_extend_backend_js')

    @if(env('MODULE_HELLOWORLD_ENV') == 'develop')
        <script type="module" src="http://localhost:8066/Vue/main.js"></script>
    @else
        <script type="module" src="{{vh_module_assets_url("HelloWorld", "build/index.js")}}"></script>
    @endif

@endsection

@section('content')

    <div class="primevue">
        <div id="appHelloWorld">


        </div>
    </div>

@endsection
