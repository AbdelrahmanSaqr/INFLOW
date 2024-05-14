@extends('layouts.main')

@section('content')
    <div class="col-12">
        <div class="card card-primary">

            <div class="card-body">
                <div>
                    <div class="btn-group w-100 mb-2">
                        <a class="btn btn-info active" href="javascript:void(0)" data-filter="all"> All items </a>
                        <a class="btn btn-info" href="javascript:void(0)" data-filter="1"> Category 1 (WHITE) </a>
                        <a class="btn btn-info" href="javascript:void(0)" data-filter="2"> Category 2 (BLACK) </a>
                        <a class="btn btn-info" href="javascript:void(0)" data-filter="3"> Category 3 (COLORED) </a>
                        <a class="btn btn-info" href="javascript:void(0)" data-filter="4"> Category 4 (COLORED, BLACK) </a>
                    </div>
                    <div class="mb-2">
                        <a class="btn btn-secondary" href="javascript:void(0)" data-shuffle=""> Shuffle items </a>
                        <div class="float-right">
                            <select class="custom-select" style="width: auto;" data-sortorder="">
                                <option value="index"> Sort by Position </option>
                                <option value="sortData"> Sort by Custom Data </option>
                            </select>
                            <div class="btn-group">
                                <a class="btn btn-default" href="javascript:void(0)" data-sortasc=""> Ascending </a>
                                <a class="btn btn-default" href="javascript:void(0)" data-sortdesc=""> Descending </a>
                            </div>
                        </div>
                    </div>
                </div>







                <div>
                    <div class="filter-container p-0 row"
                        style="padding: 3px; position: relative; width: 100%; display: flex; flex-wrap: wrap; height: 307px;">
                        <div class="filtr-item col-sm-2" data-category="1" data-sort="white sample"
                            style="opacity: 1; transform: scale(1) translate3d(0px, 0px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FFFFFF.png?text=1" data-toggle="lightbox"
                                data-title="sample 1 - white">
                                <img src="https://via.placeholder.com/300/FFFFFF?text=1" class="img-fluid mb-2"
                                    alt="white sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="2, 4" data-sort="black sample"
                            style="opacity: 1; transform: scale(1) translate3d(159px, 0px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/000000.png?text=2" data-toggle="lightbox"
                                data-title="sample 2 - black">
                                <img src="https://via.placeholder.com/300/000000?text=2" class="img-fluid mb-2"
                                    alt="black sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="3, 4" data-sort="red sample"
                            style="opacity: 1; transform: scale(1) translate3d(318px, 0px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FF0000/FFFFFF.png?text=3" data-toggle="lightbox"
                                data-title="sample 3 - red">
                                <img src="https://via.placeholder.com/300/FF0000/FFFFFF?text=3" class="img-fluid mb-2"
                                    alt="red sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="3, 4" data-sort="red sample"
                            style="opacity: 1; transform: scale(1) translate3d(477px, 0px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FF0000/FFFFFF.png?text=4" data-toggle="lightbox"
                                data-title="sample 4 - red">
                                <img src="https://via.placeholder.com/300/FF0000/FFFFFF?text=4" class="img-fluid mb-2"
                                    alt="red sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="2, 4" data-sort="black sample"
                            style="opacity: 1; transform: scale(1) translate3d(636px, 0px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/000000.png?text=5" data-toggle="lightbox"
                                data-title="sample 5 - black">
                                <img src="https://via.placeholder.com/300/000000?text=5" class="img-fluid mb-2"
                                    alt="black sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="1" data-sort="white sample"
                            style="opacity: 1; transform: scale(1) translate3d(795px, 0px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FFFFFF.png?text=6" data-toggle="lightbox"
                                data-title="sample 6 - white">
                                <img src="https://via.placeholder.com/300/FFFFFF?text=6" class="img-fluid mb-2"
                                    alt="white sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="1" data-sort="white sample"
                            style="opacity: 1; transform: scale(1) translate3d(0px, 152px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FFFFFF.png?text=7" data-toggle="lightbox"
                                data-title="sample 7 - white">
                                <img src="https://via.placeholder.com/300/FFFFFF?text=7" class="img-fluid mb-2"
                                    alt="white sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="2, 4" data-sort="black sample"
                            style="opacity: 1; transform: scale(1) translate3d(159px, 152px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/000000.png?text=8" data-toggle="lightbox"
                                data-title="sample 8 - black">
                                <img src="https://via.placeholder.com/300/000000?text=8" class="img-fluid mb-2"
                                    alt="black sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="3, 4" data-sort="red sample"
                            style="opacity: 1; transform: scale(1) translate3d(318px, 152px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FF0000/FFFFFF.png?text=9" data-toggle="lightbox"
                                data-title="sample 9 - red">
                                <img src="https://via.placeholder.com/300/FF0000/FFFFFF?text=9" class="img-fluid mb-2"
                                    alt="red sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="1" data-sort="white sample"
                            style="opacity: 1; transform: scale(1) translate3d(477px, 152px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FFFFFF.png?text=10" data-toggle="lightbox"
                                data-title="sample 10 - white">
                                <img src="https://via.placeholder.com/300/FFFFFF?text=10" class="img-fluid mb-2"
                                    alt="white sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="1" data-sort="white sample"
                            style="opacity: 1; transform: scale(1) translate3d(636px, 152px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/FFFFFF.png?text=11" data-toggle="lightbox"
                                data-title="sample 11 - white">
                                <img src="https://via.placeholder.com/300/FFFFFF?text=11" class="img-fluid mb-2"
                                    alt="white sample">
                            </a>
                        </div>
                        <div class="filtr-item col-sm-2" data-category="2, 4" data-sort="black sample"
                            style="opacity: 1; transform: scale(1) translate3d(795px, 152px, 0px); backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 156.4px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s;">
                            <a href="https://via.placeholder.com/1200/000000.png?text=12" data-toggle="lightbox"
                                data-title="sample 12 - black">
                                <img src="https://via.placeholder.com/300/000000?text=12" class="img-fluid mb-2"
                                    alt="black sample">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    {{-- <div class="blog-card">
    <div class="meta">
      <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
      <ul class="details">
        <li class="author"><a href="#">John Doe</a></li>
        <li class="date">Aug. 24, 2015</li>
        <li class="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">HTML</a></li>
            <li><a href="#">CSS</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="description">
      <h1>Learning to Code</h1>
      <h2>Opening a door to the future</h2>
      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
  <div class="blog-card alt">
    <div class="meta">
      <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg)"></div>
      <ul class="details">
        <li class="author"><a href="#">Jane Doe</a></li>
        <li class="date">July. 15, 2015</li>
        <li class="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">JavaScript</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="description">
      <h1>Mastering the Language</h1>
      <h2>Java is not the same as JavaScript</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div> --}}




    {{-- <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Starter Page</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Starter Page</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Responsive Hover Table</h3>
                    <div class="card-tools">
                        <div class="input-group input-group-sm" style="width: 150px;">
                            <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-default">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body table-responsive p-0">
                    <table class="table table-hover text-nowrap">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>



                            <tr>
                                <td>artical::name</td>
                                <td>John Doe</td>
                                <td>11-7-2014</td>
                                <td><span class="tag tag-success">Approved</span></td>
                                <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                            </tr>




                        </tbody>
                    </table>
                </div>

            </div>
            <!-- /.row -->
        </div><!-- /.container-fluid -->
    </div> --}}
@endsection
@section('content_js')

    <script src="../../js/ekko-lightbox/ekko-lightbox.min.js"></script>

    <script src="../../js/adminlte.min.js"></script>

    <script src="../js/filterizr/jquery.filterizr.min.js"></script>



    <script>
        $(function() {
            $(document).on('click', '[data-toggle="lightbox"]', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox({
                    alwaysShowClose: true
                });
            });

            $('.filter-container').filterizr({
                gutterPixels: 3
            });
            $('.btn[data-filter]').on('click', function() {
                $('.btn[data-filter]').removeClass('active');
                $(this).addClass('active');
            });
        })
    </script>

@endsection
