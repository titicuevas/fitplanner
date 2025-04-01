@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg">
                    <div class="card-header text-center">
                        <h2>Selecciona tu objetivo</h2>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('objective.store') }}" method="POST">
                            @csrf
                            <!-- Campo para el objetivo -->
                            <div class="form-group">
                                <label for="objective">Objetivo</label>
                                <select id="objective" name="objective" class="form-control" required>
                                    <option value="Pérdida de peso">Pérdida de peso</option>
                                    <option value="Ganancia muscular">Ganancia muscular</option>
                                    <option value="Mejorar resistencia">Mejorar resistencia</option>
                                    <option value="Mejorar flexibilidad">Mejorar flexibilidad</option>
                                </select>
                                @error('objective')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Campo para la edad -->
                            <div class="form-group">
                                <label for="age">Edad</label>
                                <input type="number" id="age" name="age" class="form-control" value="{{ old('age') }}" required>
                                @error('age')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Campo para la altura -->
                            <div class="form-group">
                                <label for="height">Altura (cm)</label>
                                <input type="number" id="height" name="height" class="form-control" value="{{ old('height') }}" required>
                                @error('height')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>

                            <!-- Campo para el peso -->
                            <div class="form-group">
                                <label for="weight">Peso (kg)</label>
                                <input type="number" id="weight" name="weight" class="form-control" value="{{ old('weight') }}" required>
                                @error('weight')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="text-center mt-3">
                                <button type="submit" class="btn btn-primary w-100">Guardar objetivo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
