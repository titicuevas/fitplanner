<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWorkoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'warmup' => ['sometimes', 'required', 'string'],
            'movements' => ['sometimes', 'required', 'string'],
            'wod' => ['sometimes', 'required', 'string'],
            'duration' => ['sometimes', 'required', 'integer', 'min:1', 'max:300'],
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
        ];
    }
}
