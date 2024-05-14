@extends('layouts.main')

@section('content')
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Fees Doctor</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
                        <li class="breadcrumb-item active">fees Page</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <div class="content">
        <div class="container-fluid">
            {{-- <div class="d-print-none with-border " style="margin-bottom: 20px">
                <a href="{{ route('config.create') }}" class="btn btn-lg btn-submet" data-style="zoom-in"><span
                        class="ladda-label"><i class="la la-plus "></i> Add new time</span></a>
            </div> --}}
            <!-- $doctor -> doctors   ,    $config-> configs -->
            @if ($doctors->count() > 0)
                @foreach ($doctors as $doctor)
                    @if ($doctor->type != 'admin')
                        <div class="card">
                            <div class="card-body">
                                <div id="accordion" role="tablist">
                                    {{-- head --}}
                                    <div class="card mb-1 ">
                                        <div class="card-header bg-light" id="h{{ $doctor->id }}h" role="tab">
                                            <a class="nav-link active collapsed text-dark" data-toggle="collapse"
                                                href="#h{{ $doctor->id }}" aria-expanded="false"
                                                aria-controls="h{{ $doctor->id }}h">
                                                <h5 class="mb-0 ">{{ $doctor->name }}
                                                    <i class="float-right mt-2 right fas fa-angle-left"></i>
                                                </h5>
                                            </a>

                                        </div>

                                        {{-- body --}}

                                        <div class="collapse" id="h{{ $doctor->id }}" role="tabpanel"
                                            aria-labelledby="headingone" data-parent="#accordion" style="">
                                            <div class="card-body container">
                                                <div class="card-body table-responsive p-0 ">

                                                    <table class="table table-hover text-nowrap">
                                                        {{-- <thead>
                                                                <tr>
                                                                    <th>Day</th>
                                                                    <th>From</th>
                                                                    <th>To</th>
                                                                    <th>Type</th>
                                                                    <th>location</th>
                                                                    <th>Update</th>
                                                                    <th>Delete</th>
                                                                </tr>
                                                            </thead> --}}
                                                        <tbody>
                                                            <tr>

                                                                <td>
                                                                </td>
                                                                <td>
                                                                </td>
                                                                <td id="inputTitle1"> Fees </td>
                                                                <td>
                                                                </td>
                                                                <td>
                                                                </td>

                                                                <form method="POST" action="{{ route('doctorFees.update', ['id' => $doctor->doctor->id]) }}">
                                                                    @csrf
                                                                    <td>
                                                                        <input type="text" name="fees" class="form-control col-4" value="{{ $doctor->doctor->fees }}" id="inputTitle1">
                                                                    </td>
                                                                    <td>
                                                                        <button type="submit" class="btn btn-block btn-lg btn-submet" data-toggle="tooltip" title='Edit'>Edit</button>
                                                                    </td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </form>

                                                            </tr>

                                                        </tbody>
                                                    </table> <!-- /.table -->
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div> <!-- /.card -->
                    @endif
                @endforeach
            @else
                <h3 class="alert  main-back-color" role="alert">
                    NO Doctors
                </h3>
            @endif

        </div>

    </div>
@endsection
{{-- @section('content_js')
    <script type="text/javascript">
        $('.show_confirm').click(function(event) {
            var form = $(this).closest("form");
            var name = $(this).data("name");
            event.preventDefault();
            swal({
                    title: `Are you sure you want to Udate this config?`,
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
@endsection --}}
