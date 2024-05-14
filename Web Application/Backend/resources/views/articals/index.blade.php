@extends('layouts.main')
@section('content_css')
    {{-- <link rel="stylesheet" href="../../css/mycss/artical.css"> --}}

@endsection
@section('content')
<style>
   .card-text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2; /* Display only 2 lines */
    }
    .card-title{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2; /* Display only 2 lines */
    }
</style>
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Articles</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
                        <li class="breadcrumb-item active">Articles</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <div class="content contt">
        <div class="container-fluid">
            <div class="d-print-none with-border " style="margin-bottom: 20px">
                <a href="{{ route('artical.create') }}" class="btn btn-lg btn-submet" data-style="zoom-in"><span
                        class="ladda-label"><i class="la la-plus "></i> Add Article</span></a>
            </div>

            {{-- cards body --}}
            <div class="row px-2 mt-4  d-flex align-items-center justify-content-center" id="artical-cards">
                {{-- cards loop --}}
                @if ($articals->count()>0)
                @foreach ($articals as $artical )
                <div class="card col- mr-2 ml-2" style="width: 18rem;">
                    <div class="img-box">
                        <img src="{{URL::asset($artical->img)}}" alt="img" class="card-img-top" style="height: 150px; width: 100%">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title mb-2"><strong>{{ $artical->title }}</strong></h5>
                        <p class="card-text">{{ $artical->body }}.</p>
                        <div class="d-flex justify-content-end align-items-center">
                            <a href="{{ route('artical.edit', $artical->id) }}" class="btn btn-primary btn-sm mr-3">Edit</a>
                            <form method="POST" action="{{ route('artical.destroy', $artical->id) }}" class="mr-1">
                                @csrf
                                <input name="_method" type="hidden" value="DELETE">
                                <button type="submit" class="btn btn-danger btn-sm show_confirm" data-toggle="tooltip" title="Delete">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
                @endforeach
                @else
                <div class="alert  main-back-color" role="alert">
                    NO Articles
                </div>
                @endif

            </div>
        </div>
    </div>
@endsection
@section('content_js')
    <script type="text/javascript">
        $('.show_confirm').click(function(event) {
            var form = $(this).closest("form");
            var name = $(this).data("name");
            event.preventDefault();
            swal({
                    title: `Are you sure you want to delete this config?`,
                    text: "If you delete this, it will be gone forever.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        form.submit();
                    }
                });
        });
    </script>
@endsection
