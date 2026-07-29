<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MonthlyPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'month' => ['required', 'integer', 'between:1,12'],
        ];
    }

    public function messages(): array
    {
        return [
            'month.required' => 'El mes es obligatorio.',
            'month.between' => 'El mes debe estar entre 1 y 12.',
        ];
    }
}
