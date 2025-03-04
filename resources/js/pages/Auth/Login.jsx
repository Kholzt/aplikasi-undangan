import Button from "@/components/Button";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            {status && (
                <div className="mb-4 text-sm font-medium text-[--secondary-color]">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <h1 className="text-xl font-medium mb-1">Login</h1>
                <p className="mb-2">Silahkan masukkan akun untuk melanjutkan</p>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 ">
                            Ingat saya
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className=" text-center   rounded-md text-sm text-gray-600 underline hover:text-gray-900  "
                        >
                            Lupa kata sandi?
                        </Link>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={processing}
                >
                    Masuk
                </Button>
                <Link
                    href={route("register")}
                    className="  block mt-2 text-center  rounded-md text-sm text-gray-600 underline hover:text-gray-900  "
                >
                    Tidak memiliki akun? Buat akun baru
                </Link>
            </form>
        </GuestLayout>
    );
}
