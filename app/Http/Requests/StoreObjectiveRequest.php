<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreObjectiveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'objective' => [
                'required',
                'string',
                Rule::in([
                    'Pérdida de peso',
                    'Ganancia muscular',
                    'Mejorar resistencia',
                    'Mejorar flexibilidad',
                ]),
            ],
            'birth_date' => ['required', 'date', 'before:today', 'after:1920-01-01'],
            'height' => ['required', 'numeric', 'between:100,250'],
            'weight' => ['required', 'numeric', 'between:30,200'],
        ];
    }

    public function messages(): array
    {
        return [
            'objective.required' => 'Selecciona un objetivo.',
            'objective.in' => 'El objetivo seleccionado no es válido.',
            'birth_date.required' => 'La fecha de nacimiento es obligatoria.',
            'birth_date.before' => 'La fecha de nacimiento debe ser anterior a hoy.',
            'height.between' => 'La altura debe estar entre 100 y 250 cm.',
            'weight.between' => 'El peso debe estar entre 30 y 200 kg.',
        ];
    }
}
