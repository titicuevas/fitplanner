<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkoutsByMonthRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'month' => ['required', 'integer', 'between:1,12'],
            'year' => ['required', 'integer', 'min:2020', 'max:' . (now()->year + 1)],
        ];
    }

    public function messages(): array
    {
        return [
            'month.required' => 'El mes es obligatorio.',
            'month.between' => 'El mes debe estar entre 1 y 12.',
            'year.required' => 'El año es obligatorio.',
            'year.min' => 'El año debe ser :min o posterior.',
        ];
    }
}
