<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getAll(Request $request) {
        $page = $request->page;
        $pageSize = $request->pageSize ?? 10;
        $data = Account::orderBy('id', 'asc');

        if($page) {
            $data = $data->paginate($pageSize, ['*'], 'page', $page);
        }
        else {
            $data = $data->get();
        }
        return response()->json($data);
    } 

    public function addAccount(Request $request){
        try{
            $data = Account::create($request->all());
            return response()->json($data);
        } catch (\Throwable $e){
            return response()->json(['status' => false , 'message' => $e]);
        }
    }

    public function updateAccount(Request $request, $id){
        $data = Account::where('id', $id);
        if($data->exists()){
            try{
                if($request->name) {
                    $data->update([
                        'name' => $request->name
                    ]);
                }
                return response()->json(['status' => true , 'message' => 'Updated Successfully']);
            } catch (\Throwable $e){
                return $e;
            }
        } else {
            return response()->json(['status' => false , 'message' => 'Update Failed']);
        }
    }

    public function deleteAccount(Request $request, $id){
        $data = Account::where('id', $id);
        $data->delete();
        return response()->json(['status' => true , 'message' => 'Deleted Successfully']);
    }
}
