import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 sm:px-6 lg:px-8">
            <Head title="Iniciar Sesión - FitPlanner CrossFit" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-20 w-auto drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/images/fitplanner-logo.png"
                    alt="FitPlanner Logo"
                />
                <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_0.3rem_#ffffff70]">
                    Accede a tu cuenta
                </h2>
                <p className="mt-2 text-center text-base text-gray-100">
                    ¿No tienes una cuenta?{' '}
                    <Link 
                        href={route('register')} 
                        className="font-semibold text-red-400 transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    >
                        Regístrate aquí
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-900/90 px-6 py-8 shadow-[0_0_1rem_rgba(0,0,0,0.3)] backdrop-blur-sm sm:rounded-xl sm:px-12">
                    {status && (
                        <div className="mb-4 rounded-md bg-green-500/20 p-4 text-sm font-medium text-green-400 shadow-lg">
                            {status}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
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
                                    autoComplete="current-password"
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-600 bg-gray-800/50 text-red-500 transition-colors focus:ring-2 focus:ring-red-500/50"
                                />
                                <label htmlFor="remember" className="ml-3 block text-base text-gray-100">
                                    Recordarme
                                </label>
                            </div>

                            {canResetPassword && (
                                <div className="text-sm">
                                    <Link
                                        href={route('password.request')}
                                        className="font-semibold text-red-400 transition-all duration-200 hover:text-white hover:drop-shadow-[0_0_0.3rem_#ffffff70]"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            )}
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
                                        Iniciando sesión...
                                    </span>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
