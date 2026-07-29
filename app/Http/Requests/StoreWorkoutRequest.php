<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'warmup' => ['required', 'string'],
            'movements' => ['required', 'string'],
            'wod' => ['required', 'string'],
            'duration' => ['required', 'integer', 'min:1', 'max:300'],
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio.',
            'warmup.required' => 'El calentamiento es obligatorio.',
            'movements.required' => 'Los movimientos son obligatorios.',
            'wod.required' => 'El WOD es obligatorio.',
            'duration.required' => 'La duración es obligatoria.',
            'category_id.exists' => 'La categoría seleccionada no existe.',
        ];
    }
}
