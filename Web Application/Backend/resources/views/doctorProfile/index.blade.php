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
                    <h1 class="m-0">Doctor Profile</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
                        <li class="breadcrumb-item active">Doctor Profile</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->


    {{-- body --}}
    <div class="content">
        <div class="container-fluid">
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

                <form action="{{ route('doctorProfile.update') }}" method="POST" role="form" enctype="multipart/form-data">
                    @csrf
                    {{-- name & phone number --}}
                    <div class="row mb-3 d-flex justify-content-center">
                        <div class="col-md-8 pb-2">
                            <label class="form-label" for="inputTitle1">Name</label>
                            <input type="text" name="name" class="form-control" value="{{ $doctor->user->name }}" id="inputTitle1">
                        </div>
                        <div class="col-md-8 pb-2">
                            <label class="form-label" for="inputTitle2">Phone Number</label>
                            <input type="text" name="phone_num" class="form-control" value="{{ $doctor->user->phone_num }}" id="inputTitle2">
                        </div>
                        <div class=" col-md-8 form-group">
                            <label class="form-label" for="Controldes1">Bio</label>
                            <textarea class="form-control" name="bio" id="Controldes1" rows="2">{{ $doctor->bio }}</textarea>
                        </div>
                        <div class=" col-md-8 form-group">
                            <label class="form-label" for="Controldes2">Info</label>
                            <textarea class="form-control" name="info" id="Controldes2" rows="2">{{ $doctor->info }}</textarea>
                        </div>
                    </div>
                    {{-- img --}}
                    <div class="row mb-3 d-flex justify-content-center">
                        <div class="col-md-5 d-flex justify-content-center">
                            <div class="col-md-6">
                                <label class="form-label" for="inImg">Img</label>
                                <input class="" id="inImg" name="img" value="{{ $doctor->user->img }}" type="file" />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <img style="height: 150px" id="image" src="{{ URL::asset($doctor->user->img) }}">
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <div class="row col-lg-2 col-md-8 ">
                            <button type="submit" class=" btn btn-block btn-lg btn-submet ">Update</button>
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
