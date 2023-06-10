@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_backend_css')

@endsection


@section('vaahcms_extend_backend_js')
    <!--<script src="{{vh_module_assets_url("Vikram", "assets/js/script.js")}}"></script>-->
@endsection

@section('content')


    <div class="grid" style="margin: 20px;">
        <div class="col">
            <h1 class="title">Vikram</h1>
            <h2 class="subtitle">
                Your <strong>"Vikram"</strong> module's dashboard is ready!
            </h2>
        </div>
    </div>


@endsection
