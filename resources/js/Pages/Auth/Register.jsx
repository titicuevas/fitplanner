import { Head, Link, useForm } from '@inertiajs/react';
import { InputLabel, TextInput } from '@/Components/Forms/InputLabel';
import { InputError } from '@/Components/Forms/InputError';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        birth_date: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 sm:px-6 lg:px-8">
            <Head title="Registro - FitPlanner CrossFit" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-20 w-auto drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/images/fitplanner-logo.png"
                    alt="FitPlanner Logo"
                />
                <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_0.3rem_#ffffff70]">
                    Crea tu cuenta
                </h2>
                <p className="mt-2 text-center text-base text-gray-100">
                    ¿Ya tienes una cuenta?{' '}
                    <Link 
                        href={route('login')} 
                        className="font-semibold text-red-400 transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    >
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-900/90 px-6 py-8 shadow-[0_0_1rem_rgba(0,0,0,0.3)] backdrop-blur-sm sm:rounded-xl sm:px-12">
                    <form className="space-y-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="name" className="block text-base font-medium text-gray-100">
                                Nombre completo
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="block w-full appearance-none rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-base text-white placeholder-gray-400 shadow-sm transition-colors focus:border-red-500 focus:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm font-medium text-red-400">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-base font-medium text-gray-100">
                                Correo electrónico
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full appearance-none rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-base text-white placeholder-gray-400 shadow-sm transition-colors focus:border-red-500 focus:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm font-medium text-red-400">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-base font-medium text-gray-100">
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full appearance-none rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-base text-white placeholder-gray-400 shadow-sm transition-colors focus:border-red-500 focus:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm font-medium text-red-400">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-base font-medium text-gray-100">
                                Confirmar contraseña
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="block w-full appearance-none rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-base text-white placeholder-gray-400 shadow-sm transition-colors focus:border-red-500 focus:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm font-medium text-red-400">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <div>
                            <InputLabel htmlFor="birth_date" value="Fecha de Nacimiento" />
                            <TextInput
                                id="birth_date"
                                type="date"
                                name="birth_date"
                                value={data.birth_date}
                                className="mt-1 block w-full"
                                autoComplete="birth_date"
                                onChange={(e) => setData('birth_date', e.target.value)}
                                required
                            />
                            <InputError message={errors.birth_date} className="mt-2" />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-red-500 hover:to-red-600 hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-70 disabled:hover:shadow-none"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registrando...
                                    </span>
                                ) : (
                                    'Crear cuenta'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
