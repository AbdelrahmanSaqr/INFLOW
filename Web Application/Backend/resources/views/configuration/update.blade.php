@extends('layouts.main')

@section('content')
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2" style="margin-left: 15">
                <div class="col-sm-6">
                    <h1 class="m-0">Edit Time</h1>
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
            @if (count($errors)>0)
                <ul>
                    @foreach ($errors->all() as $item)
                        <li>
                            {{ $item }}
                        </li>
                    @endforeach
                </ul>
            @endif
            <div class="card-body">

                <form action="{{ route('config.update', $config[0]->id) }}" method="POST" enctype="multipart/form-data" >
                    @csrf
                    {{-- doctor & day --}}
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="form-label" for="inputState">Doctor</label>
                            <select id="inputState" name="doctor" class="form-control">
                                @foreach ($config[1] as $item)
                                <option @if ($config[0]->doctor_id == $item->id) selected @endif
                                    value="{{ $item->user->name }}" >{{ $item->user->name }}</option>
                                @endforeach
                            </select>
                            {{-- <input type="email" class="form-control" id="inputEmail4" placeholder="Doctor"> --}}
                        </div>
                        <div class=" col-md-6">
                            <label class="form-label" for="inputPassword4">Day</label>
                            <select id="inputState" name="day" class="form-control">
                                <option @if ($config[0]->day == 'Saturday') selected @endif value="Saturday">Saturday</option>
                                <option @if ($config[0]->day == 'Sunday') selected @endif value="Sunday">Sunday</option>
                                <option @if ($config[0]->day == 'Monday') selected @endif value="Monday">Monday</option>
                                <option @if ($config[0]->day == 'Tuesday') selected @endif value="Tuesday">Tuesday</option>
                                <option @if ($config[0]->day == 'Wednesday') selected @endif value="Wednesday">Wednesday</option>
                                <option @if ($config[0]->day == 'Thursday') selected @endif value="Thursday">Thursday</option>
                                <option @if ($config[0]->day == 'Friday') selected @endif value="Friday">Friday</option>
                            </select>
                        </div>
                    </div>
                    {{-- from & to --}}
                    <div class="row mb-3 ">
                        <div class="col-md-6">
                            <div class="col-md-10">
                                <label class="form-label" for="inputEmail4">From</label>
                                <input class="form-control" name="from" type="time" value="{{ $config[0]->from }}" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-md-10">
                                <label class="form-label" for="inputEmail4">To</label>
                                <input class="form-control" name="to" type="time" value="{{  $config[0]->to }}" />
                            </div>
                        </div>
                    </div>


                    {{-- fees and type --}}
                    <div class="row mb-3">
                        {{-- <div class=" col-md-6">
                            <label class="form-label" for="inputCity">Fees</label>
                            <input  type="text" name="fees" class="form-control" value="{{ $config[0]->fees }}" id="inputCity">
                        </div> --}}
                        <div class="col-md-7">
                            <label class="form-label" for="inputState">Type</label>
                            <select id="inputState" name="type" class="form-control">
                                <option @if ($config[0]->type == 'Online') selected @endif value="Online">Online</option>
                                <option @if ($config[0]->type == 'Offline') selected @endif value="Offline">Offline</option>
                            </select>
                        </div>
                    </div>

                    {{-- location --}}
                    <div class="row mb-3">
                        <div class=" col-md-7">
                            <label class="form-label" for="inputCity">Location</label>
                            <input type="text" name="location" value="{{ $config[0]->location }}" class="form-control" id="inputCity">
                        </div>
                    </div>

                    <div class="col-12 d-flex justify-content-center">
                    <div class="row col-lg-2 col-md-8 ">
                        <button type="submit" class=" btn btn-block btn-lg btn-submet ">Update</button>
                    </div></div>
                </form>
            </div>




        </div>
    </div>
@endsection
