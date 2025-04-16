import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useRef, useEffect } from 'react';

export default function UpdateProfileInformation({ status, className = '' }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef();
    const { flash } = usePage().props;

    const { data, setData, patch, errors, processing, recentlySuccessful, reset } = useForm({
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (!data.photo) return;

        const formData = new FormData();
        formData.append('photo', data.photo);

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                photoInput.current.value = '';
                setPhotoPreview(null);
                reset('photo');
            },
        });
    };

    const handlePhotoChange = (e) => {
        if (!e.target.files[0]) return;
        
        const file = e.target.files[0];
        setData('photo', file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Foto de Perfil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Actualiza tu foto de perfil.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6" encType="multipart/form-data">
                <div>
                    <div className="mt-2 flex items-center gap-x-3">
                        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-gray-200">
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
                        <div className="flex flex-col gap-2">
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
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Cambiar foto
                            </button>
                            {photoPreview && (
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Guardando...
                                        </div>
                                    ) : 'Guardar foto'}
                                </button>
                            )}
                        </div>
                    </div>
                    {errors.photo && <p className="mt-2 text-sm text-red-600">{errors.photo}</p>}
                </div>

                {flash.message && (
                    <div className="mt-4 p-4 rounded-md bg-green-50 text-green-700">
                        {flash.message}
                    </div>
                )}

                {flash.error && (
                    <div className="mt-4 p-4 rounded-md bg-red-50 text-red-700">
                        {flash.error}
                    </div>
                )}

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="mt-2 text-sm text-green-600">Foto actualizada correctamente.</p>
                </Transition>
            </form>
        </section>
    );
}
