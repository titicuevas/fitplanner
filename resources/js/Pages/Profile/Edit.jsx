import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, auth }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Mi Perfil
                    </h2>
                </div>
            }
        >
            <Head title="Mi Perfil" />

            <div className="py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Tarjeta de Perfil Destacada */}
                    <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="absolute top-0 h-24 w-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                        <div className="relative p-6 sm:p-8">
                            <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link href={route('dashboard')} className="relative group">
                                    <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg transition-transform duration-200 transform group-hover:scale-105">
                                        <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-300 transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                            </svg>
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                            Ir al Dashboard
                                        </span>
                                    </div>
                                </Link>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                        {auth?.user?.name}
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        {auth?.user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secciones de Configuración */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Información del Perfil */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg transition-all duration-200 hover:shadow-md">
                            <div className="p-6">
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Información del Perfil
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Actualiza tu información personal
                                        </p>
                                    </div>
                                </div>
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>
                        </div>

                        {/* Actualizar Contraseña */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg transition-all duration-200 hover:shadow-md">
                            <div className="p-6">
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Actualizar Contraseña
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Asegura tu cuenta con una contraseña fuerte
                                        </p>
                                    </div>
                                </div>
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Eliminar Cuenta */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg transition-all duration-200 hover:shadow-md">
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Eliminar Cuenta
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Elimina permanentemente tu cuenta y todos tus datos
                                    </p>
                                </div>
                            </div>
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
