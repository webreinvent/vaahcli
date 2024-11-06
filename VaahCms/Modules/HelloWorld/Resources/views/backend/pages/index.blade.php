@extends(((version_compare(config('vaahcms.version'), '2.0.0', '<' )) ? 'vaahcms::backend.vaahone.layouts.backend' : 'vaahcms::backend.vaahtwo.layouts.backend' ))

@section('vaahcms_extend_backend_css')

@endsection


@section('vaahcms_extend_backend_js')
    <!--<script src="{{vh_module_assets_url("HelloWorld", "assets/js/script.js")}}"></script>-->
@endsection

@section('content')


    <div style="margin: 20px;">
        <h1 class="title">HelloWorld</h1>
        <h2 class="subtitle">
            Your <strong>"HelloWorld"</strong> module's dashboard is ready!
        </h2>
    </div>


@endsection
