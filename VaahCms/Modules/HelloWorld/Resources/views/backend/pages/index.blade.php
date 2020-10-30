@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_admin_css')

@endsection


@section('vaahcms_extend_admin_js')
    <!--<script src="{{vh_module_assets_url("HelloWorld", "assets/js/script.js")}}"></script>-->
@endsection

@section('content')

    <!--sections-->
    <section class="section">
        <div class="container">
            <h1 class="title">HelloWorld</h1>
            <h2 class="subtitle">
                Your <strong>"HelloWorld"</strong> module's dashboard is ready!
            </h2>
        </div>
    </section>
    <!--sections-->



@endsection
