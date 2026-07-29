<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompleteWorkoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'score' => $this->filled('score') ? $this->input('score') : null,
            'notes' => $this->filled('notes') ? $this->input('notes') : null,
        ]);
    }

    public function rules(): array
    {
        return [
            'workout_id' => ['required', 'integer', 'exists:workouts,id'],
            'score' => ['nullable', 'integer', 'between:1,10'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'workout_id.required' => 'El entrenamiento es obligatorio.',
            'workout_id.exists' => 'El entrenamiento seleccionado no existe.',
            'score.between' => 'La puntuación debe estar entre 1 y 10.',
            'notes.max' => 'Las notas no pueden superar los :max caracteres.',
        ];
    }
}
