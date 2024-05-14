@extends('layouts.main')

@section('content')
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2" style="margin-left: 15">
                <div class="col-sm-6">
                    <h1 class="m-0">Create Time</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item active">home Page</li>
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
                <a href="{{ route('configs') }}" class="btn btn-lg btn-submet" data-style="zoom-in"><span
                        class="ladda-label"><i class="la la-plus "></i> Show Configrations</span></a>
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

                <form action="{{ route('config.store') }}" method="POST">
                    @csrf
                    {{-- doctor & day --}}
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="form-label" for="inputState">Doctor</label>
                            <select id="inputState" name="doctor" class="form-control">
                                <option selected="" value="">Choose...</option>
                                @foreach ($doctors as $item)
                                    @if ($item->user->type != 'admin')
                                        <option value="{{ $item->user->name }}">{{ $item->user->name }}</option>
                                    @endif
                                @endforeach
                            </select>
                            {{-- <input type="email" class="form-control" id="inputEmail4" placeholder="Doctor"> --}}
                        </div>
                        <div class=" col-md-6">
                            <label class="form-label" for="inputPassword4">Day</label>
                            <select id="inputState" name="day" class="form-control">
                                <option selected="" value="">Choose...</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </div>
                    </div>
                    {{-- from & to --}}
                    <div class="row mb-3 ">
                        <div class="col-md-6">
                            <div class="col-md-10">
                                <label class="form-label" for="inputEmail4">From</label>
                                <input class="form-control" name="from" type="time" value="12:00" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-10">
                                <label class="form-label" for="inputEmail4">To</label>
                                <input class="form-control" name="to" type="time" value="12:00" />
                            </div>
                        </div>
                    </div>


                    {{-- fees and type --}}
                    <div class="row mb-3">
                        {{-- <div class=" col-md-6">
                            <label class="form-label" for="inputCity">Fees</label>
                            <input type="text" name="fees" class="form-control" id="inputCity">
                        </div> --}}
                        <div class="col-md-7">
                            <label class="form-label" for="inputState">Type</label>
                            <select id="inputState" name="type" class="form-control">
                                <option selected="">Choose...</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>
                    </div>

                    {{-- location --}}
                    <div class="row mb-3">
                        <div class=" col-md-7">
                            <label class="form-label" for="inputCity">Location</label>
                            <input type="text" name="location" class="form-control" value="..." id="inputCity">
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
