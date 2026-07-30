import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Props = {
    status?: string;
};

export default function VerifyEmail({ status }: Props) {
    const { post, processing } = useForm({});

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout title="Verificar email">
            <Head title="Verificar Email" />

            <p className="mb-4 text-sm text-gray-300">
                Gracias por registrarte. Antes de continuar, verifica tu correo con el enlace que te enviamos.
            </p>

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-md bg-green-500/20 p-3 text-sm font-medium text-green-400">
                    Se ha enviado un nuevo enlace de verificación a tu correo.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <PrimaryButton disabled={processing}>
                        Reenviar correo
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-300 underline hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
