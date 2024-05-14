<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Artical;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticalController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctor = Doctor::where('user_id', '=', Auth::id())->first();
        $articals = Artical::where('doctor_id', $doctor->id)->get();
        return view('articals.index')->with('articals', $articals);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('articals.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'body' => 'required',
            'img' => 'required',
            'description' => 'required'
        ]);
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('img/articals/', $fileName);
        }
        // $img = $request->img;
        // $newImg = time().$img->getClientOriginalName();
        // $img->move('img/articals/', $newImg);
        $doctor = Doctor::where('user_id', '=', Auth::id())->first();
        //--------
        $artical = Artical::create([
            'doctor_id' => $doctor->id,
            'title' => $request->title,
            'body' => $request->body,
            'description' => $request->description,
            'img' => 'img/articals/' . $fileName,
        ]);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $artical = Artical::find($id);
        return view('articals.show')->with('artical', $artical);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $artical = Artical::find($id);
        return view('articals.update')->with('artical', $artical);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        $this->validate($request, [
            'title' => 'required',
            'body' => 'required',
            //'img' => 'required|image',
            'description' => 'required'
        ]);

        // if ($request->has('img')) {
        //     $img = $request->img;
        //     $newImg = time();
        //     $img->move('Upload/articals' . $newImg);
        //     $artical->img = 'Upload/articals' . $newImg;
        // }

        $artical = Artical::find($id);
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('img/articals/', $fileName);
            //------
            $artical->title = $request->title;
            $artical->body = $request->body;
            $artical->description = $request->description;
            $artical->img = 'img/articals/' . $fileName;
            $artical->save;
            return redirect()->back();
        }else{
        $artical->title = $request->title;
        $artical->body = $request->body;
        $artical->description = $request->description;
        $artical->save();
        return redirect()->back();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $artical = Artical::find($id);
        $artical->delete();
        return redirect()->back();
    }
}
