<?php
$today = new Datetime(date('Y-m-d'));
$day_next = date('Y-m-d', strtotime('+1 day', strtotime(Carbon::parse($today)->format('Y-m-d'))));
$today_name = $today->format('D');
$diff = $today->diff($today);
$days = [$today->format('D'), date('D', strtotime('+1 day', strtotime(Carbon::parse($today)->format('D')))), date('D', strtotime('+2 day', strtotime(Carbon::parse($today)->format('D')))), date('D', strtotime('+3 day', strtotime(Carbon::parse($today)->format('D')))), date('D', strtotime('+4 day', strtotime(Carbon::parse($today)->format('D')))), date('D', strtotime('+5 day', strtotime(Carbon::parse($today)->format('D')))), date('D', strtotime('+6 day', strtotime(Carbon::parse($today)->format('D'))))];
$days_num = [$today->format('Y-m-d'), date('Y-m-d', strtotime('+1 day', strtotime(Carbon::parse($today)->format('Y-m-d')))), date('Y-m-d', strtotime('+2 day', strtotime(Carbon::parse($today)->format('Y-m-d')))), date('Y-m-d', strtotime('+3 day', strtotime(Carbon::parse($today)->format('Y-m-d')))), date('Y-m-d', strtotime('+4 day', strtotime(Carbon::parse($today)->format('Y-m-d')))), date('Y-m-d', strtotime('+5 day', strtotime(Carbon::parse($today)->format('Y-m-d')))), date('Y-m-d', strtotime('+6 day', strtotime(Carbon::parse($today)->format('Y-m-d'))))];

?>
@extends('layouts.main')
@section('content_css')
@endsection
@section('content')
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Appointments</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item main-color"><a href="{{ route('home') }}">Home</a></li>
                        <li class="breadcrumb-item active">Appointment Page</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Body -->
    <div class="content">
        <div class="container-fluid">
            <!-- weeks -->
            <div class="row d-flex justify-content-center font-weight-bold days-menu">

                @foreach ($days as $day)
                    <div class="info-box col-2 col-sm-2 col-md-1 mr-2 p-0 day-list @if ($today_name == $day) my_active @endif "
                        data-list="{{ $day }}">
                        <div class="info-box-content text-center ">
                            <span class="info-box-text font-weight-bold ">{{ $day }}</span>
                            <span class="info-box-number">
                                {{ Carbon::parse($day)->format('d') }}
                            </span>
                        </div>
                    </div>
                @endforeach

            </div><!-- /weeks -->
            <!-- body -->
            <div class="content">
                <div class="container-fluid">

                    <!-- card -->
                    <div class="card-body pd-0 target-apps">
                        <!-- text -->
                        <div class="lg-12 row d-flex " style="margin: 20px">
                            <h3 class="m-0 font-weight-bold text-center ">You've got
                                <span class="main-back-color p-1 rounded">{{ $appointment->count() }}</span>
                                meeting this week

                            </h3>
                        </div><!-- /text -->

                        @foreach ($days as $day)
                            <?php $count = 0;
                            ?>
                            <div class="row target-app {{ $day }} @if ($today_name == $day) today @endif">
                                @foreach ($appointment as $app)
                                    @if (Carbon::parse($day)->format('d') == $app->date->format('d'))
                                        <?php
                                        $count = 1;
                                        ?>
                                        <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                                            <a href="">
                                                <div class="card main-back-color d-flex flex-fill ">
                                                    <div class="card-body pt-3 pb-0">
                                                        <div class="row">
                                                            <div class="col-2 text-center">
                                                                <img src="{{ URL::asset($app->patient->user->img) }}"
                                                                    alt="user-avatar" class="img-circle img-fluid">
                                                            </div>
                                                            <div class="col-10 ">
                                                                <h2 class="lead font-weight-bold">
                                                                    <b>{{ $app->patient->user->name }}</b>
                                                                </h2>
                                                                <p class=" text-sm "> {{ $app->patient->age }}/
                                                                    {{ $app->patient->gender }}/{{ $app->type }}
                                                                </p>
                                                                <div class="d-flex  " style="padding: 0px 10px">
                                                                    <ul class="ml-12  mb-0 fa-ul text-muted  ">
                                                                        <li class="small"><span class="fa-li"><i
                                                                                    class="fas fa-lg fa-building "></i></span>
                                                                            Location: {{ $app->location }}</li>
                                                                        <li class="small"><span class="fa-li"><i
                                                                                    class="fas fa-lg fa-phone"></i></span>
                                                                            Phone:{{ $app->patient->user->phone_num }}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="card-footer row d-flex pt-3 pb-1 "
                                                            style="font-size: 0.9rem">
                                                            <div class=" mr-auto">
                                                                <span>
                                                                    @if ($app->from < $today && $today_name == $day)
                                                                        In Progress
                                                                    @else
                                                                        Finished
                                                                    @endif
                                                                </span>
                                                            </div>
                                                            <div class="text-right">
                                                                <span> {{ Carbon::parse($app->from)->format('h:i A') }}
                                                                </span> - <span>
                                                                    {{ Carbon::parse($app->to)->format('h:i A') }}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </a>
                                        </div>
                                    @endif
                                @endforeach

                                @if ($count == 0)
                                    <div class="alert col-12 main-back-color" role="alert">
                                        NO Meetings Today
                                    </div>
                                @endif
                            </div>
                        @endforeach

                    </div>

                </div>
            </div>

        </div>
    </div>
@endsection
@section('content_js')
    <script>
        $(document).ready(function() {
            $(".target-app").hide();
            $(".target-apps .today").show();


            $(".day-list").click(function() {
                $(".day-list").removeClass("my_active");
                $(this).addClass("my_active");

                var current_tab = $(this).attr("data-list");
                $(".target-app").hide();
                $("." + current_tab).show();
            });


        });
    </script>
@endsection

 {{-- <script src="../../js/ekko-lightbox/ekko-lightbox.min.js"></script>

    <script src="../js/filterizr/jquery.filterizr.min.js"></script>



    <script>
        $(function() {
            $(document).on('click', '[data-toggle="lightbox"]', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox({
                    alwaysShowClose: true
                });
            });

            // $('.filter-container').filterizr({
            //     gutterPixels: 3
            // });
            $('.app[data-filter]').on('click', function() {
                $('.btn[data-filter]').removeClass('my_active');
                $(this).addClass('my_active');
            });
        })
    </script> --}}
