import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useRef } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef();

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                photoInput.current.value = '';
                setPhotoPreview(null);
            },
        });
    };

    const handlePhotoChange = (e) => {
        if (!e.target.files[0]) return;
        
        setData('photo', e.target.files[0]);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotoPreview(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Información del Perfil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Actualiza la información de tu perfil y tu dirección de correo electrónico.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full">
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Vista previa"
                                    className="h-full w-full object-cover"
                                />
                            ) : user.profile_photo_url ? (
                                <img
                                    src={user.profile_photo_url}
                                    alt="Foto de perfil actual"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                                    alt="Avatar por defecto"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            ref={photoInput}
                            onChange={handlePhotoChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            type="button"
                            onClick={() => photoInput.current.click()}
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Cambiar foto
                        </button>
                    </div>
                    {errors.photo && <p className="mt-2 text-sm text-red-600">{errors.photo}</p>}
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Tu dirección de correo electrónico no está verificada.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        disabled={processing}
                    >
                        Guardar
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
