import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Props = {
    status?: string;
};

export default function ForgotPassword({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout title="Recuperar contraseña">
            <Head title="Recuperar Contraseña" />

            <p className="mb-4 text-sm text-gray-300">
                Indícanos tu correo y te enviaremos un enlace para restablecer la contraseña.
            </p>

            {status && (
                <div className="mb-4 rounded-md bg-green-500/20 p-3 text-sm font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                        Correo electrónico
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-600 bg-gray-800 text-gray-100"
                        isFocused
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                    <Link href={route('login')} className="text-sm text-red-400 hover:text-red-300">
                        Volver al login
                    </Link>
                    <PrimaryButton disabled={processing}>
                        Enviar enlace
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
