<?php

namespace App\Http\Controllers\Api;

use App\Models\Artical;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArticalResource;
use Illuminate\Support\Facades\Validator;

class ArticalController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $articals = ArticalResource::collection(Artical::get()); //data // return all data
        return $this->apiResponse($articals, '', 200);
    }
    public function show($id)
    {
        //$post = Post::find($id); // find to search
        $artical = Artical::find($id);
        if ($artical) {
            return $this->apiResponse(new ArticalResource($artical), 'ok', 200); //articalResource:tore turn same of data
        }
        return $this->apiResponse(null, 'the artical not found', 404);
    }


    public function store(Request $request)
    {     //insert data
        //validation
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required',
            'title' => 'required|max:255',
            'body' => 'required',
            'img' => 'required|image|mimes:png,jpg,gif,jpeg,svg|max:2048',
            'description' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        // -------------
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('img/articals/', $fileName);
        }
        //--------
        $artical = Artical::create([
            'doctor_id' => $request->doctor_id,
            'title' => $request->title,
            'body' => $request->body,
            'description' => $request->description,
            'img' => 'img/articals/' . $fileName,
        ]);
        if ($artical) {
            return $this->apiResponse($artical, 'saved', 201);
        }
        return $this->apiResponse(null, 'artical not save', 400);
    }


    //search articals
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->apiResponse(null, $validator->errors(), 400);
        }
        // -------------
        $searchQuery = $request->search;
        $keywords = explode(' ', $searchQuery);

        $query = Artical::query();

        foreach ($keywords as $keyword) {
            $query->orWhere('title', 'LIKE', "%$keyword%");
        }

        $articals = ArticalResource::collection($query->get());
        if ($articals) {
            return $this->apiResponse($articals, '', 200);
        }
        return $this->apiResponse(Null, 'no articals', 404);
    }
}
