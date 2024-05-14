@extends('layouts.main')
@section('content_css')
@endsection
<!-- body -->
@section('content')
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2" style="margin-left: 15">
                <div class="col-sm-6">
                    <h1 class="m-0">Create Article</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
                        <li class="breadcrumb-item active">Articles / Create Article</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->


    {{-- body --}}
    <div class="content">
        <div class="container-fluid">
            <div class="d-print-none with-border " style="margin-bottom: 20px">
                <a href="{{ route('articals') }}" class="btn btn-lg btn-submet" data-style="zoom-in"><span
                        class="ladda-label"><i class="la la-plus "></i> Show Articles</span></a>
            </div>
            @if (count($errors) > 0)
                <ul>
                    @foreach ($errors->all() as $item)
                        <li>
                            {{ $item }}
                        </li>
                    @endforeach
                </ul>
            @endif
            <div class="card-body">

                <form action="{{ route('artical.store') }}" method="POST" role="form" enctype="multipart/form-data">
                    @csrf
                    {{-- Title & Body --}}
                    <div class="row mb-3 d-flex justify-content-center">
                        <div class="col-md-8 pb-2">
                            <label class="form-label" for="inputTitle">Title</label>
                            <input type="text" name="title" class="form-control" id="inputTitle">
                        </div>
                        <div class=" col-md-8 form-group">
                            <label class="form-label" for="ControlTextarea1">Body</label>
                            <textarea class="form-control" name="body" id="ControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class=" col-md-8 form-group">
                            <label class="form-label" for="Controldes">Description</label>
                            <textarea class="form-control" name="description" id="Controldes" rows="2"></textarea>
                        </div>
                    </div>
                    {{-- img --}}
                    <div class="row mb-3 d-flex justify-content-center">
                        <div class="col-md-5 d-flex justify-content-center">
                            <div class="col-md-6">
                                <label class="form-label" for="inImg">Img</label>
                                <input class="" id="inImg" name="img" type="file" />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <img style="height: 150px" id="image" src="../img/empty.jpg">
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <div class="row col-lg-2 col-md-8 ">
                            <button type="submit" class=" btn btn-block btn-lg btn-submet ">Create</button>
                        </div>
                    </div>
                </form>
            </div>




        </div>
    </div>
@endsection

@section('content_js')
<script>
    var file = document.getElementById("inImg")
    var img = document.getElementById("image")
    file.addEventListener("change",(e)=>{
        img.src = URL.createObjectURL(e.target.files[0])
    })
</script>
@endsection
