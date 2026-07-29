import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

type Props = {
    user?: { name: string };
};

export default function ObjectiveForm({ user }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        objective: '',
        birth_date: '',
        height: '',
        weight: '',
    });

    const [ageDisplay, setAgeDisplay] = useState('');

    useEffect(() => {
        if (data.birth_date) {
            const birthDate = new Date(data.birth_date);
            const today = new Date();
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                calculatedAge--;
            }
            setAgeDisplay(calculatedAge < 18 ? 'Menor de 18 años' : `${calculatedAge} años`);
        }
    }, [data.birth_date]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('objective.store'));
    };

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 3 && Number(value) >= 0)) {
            setData('height', value);
        }
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || (value.length <= 3 && Number(value) >= 0)) {
            setData('weight', value);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 text-gray-800 dark:text-gray-100" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06l-2.47-2.47V21a.75.75 0 01-1.5 0V4.81L8.78 7.28a.75.75 0 01-1.06-1.06l3.75-3.75z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-100">
                        Configura tus Objetivos
                    </h2>
                </div>
            }
        >
            <Head title="Configura tus Objetivos" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 dark:shadow-none">
                        <div className="p-6">
                            <div className="mb-8">
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                    ¡Personaliza tu experiencia!
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Ayúdanos a entender mejor tus objetivos y características para poder ofrecerte un plan más personalizado.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                                        required
                                    />
                                    {ageDisplay && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{ageDisplay}</p>}
                                    {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Objetivo</label>
                                    <select
                                        value={data.objective}
                                        onChange={(e) => setData('objective', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                                        required
                                    >
                                        <option value="">Selecciona un objetivo</option>
                                        <option value="Pérdida de peso">Pérdida de peso</option>
                                        <option value="Ganancia muscular">Ganancia muscular</option>
                                        <option value="Mejorar resistencia">Mejorar resistencia</option>
                                        <option value="Mejorar flexibilidad">Mejorar flexibilidad</option>
                                    </select>
                                    {errors.objective && <p className="mt-1 text-sm text-red-600">{errors.objective}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Altura (cm)</label>
                                    <input
                                        type="number"
                                        value={data.height}
                                        onChange={handleHeightChange}
                                        min="100"
                                        max="250"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                                        required
                                    />
                                    {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Peso (kg)</label>
                                    <input
                                        type="number"
                                        value={data.weight}
                                        onChange={handleWeightChange}
                                        min="30"
                                        max="200"
                                        step="0.1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                                        required
                                    />
                                    {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${processing ? 'cursor-not-allowed opacity-75' : ''}`}
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Guardando...
                                            </>
                                        ) : (
                                            'Guardar Objetivos'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
