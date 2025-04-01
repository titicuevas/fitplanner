<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ObjectiveController extends Controller


{
    public function store(Request $request)
    {
       
    
        $request->validate([
            'objective' => 'required|string',
            'age' => 'required|integer|min:1',
            'height' => 'required|integer|min:1',
            'weight' => 'required|integer|min:1',
        ]);
    
        // Obtener el usuario autenticado
        $user = Auth::user();
    
        if ($user) {
            // Guardar los datos en el usuario
            $user->objective = $request->objective;
            $user->age = $request->age;
            $user->height = $request->height;
            $user->weight = $request->weight;
            $user->save();  // Verificar si esto se guarda correctamente
    
            return redirect('/dashboard')->with('success', 'Tu objetivo ha sido guardado exitosamente.');
        }
    
        return redirect()->route('login')->withErrors('No se pudo encontrar el usuario.');
    }
    
}