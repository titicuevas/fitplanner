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
        <GuestLayout>
            <Head title="Verificar Email" />

            <div className="mb-4 text-sm text-gray-600">
                ¡Gracias por registrarte! Antes de comenzar, verifica tu correo electrónico haciendo clic en el enlace que te acabamos de enviar.
                Si no recibiste el correo, te enviaremos otro con gusto.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Se ha enviado un nuevo enlace de verificación a tu correo electrónico.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Reenviar correo de verificación
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Cerrar Sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
