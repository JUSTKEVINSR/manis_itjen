import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden text-gray-200">
            {/* Background Animations & Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse hidden md:block pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse hidden md:block pointer-events-none" style={{ animationDelay: '1s' }}></div>

            <Head title="Log in" />

            <div className="w-full max-w-md p-8 md:p-10 rounded-[2rem] bg-slate-900/60 backdrop-blur-2xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 transition-all duration-300 ease-in-out relative">
                
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-500/30 border border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                             <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Enter your credentials to access your account</p>
                </div>

                {status && (
                    <div className="mb-6 px-4 py-3 text-sm font-medium text-emerald-400 bg-emerald-400/10 rounded-xl border border-emerald-400/20">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 ease-in-out sm:text-sm"
                                placeholder="you@example.com"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5 ml-1 mr-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 ease-in-out sm:text-sm"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center ml-1">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            className="h-4 w-4 bg-slate-950 border-slate-700 rounded text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-400 cursor-pointer select-none">
                            Remember me for 30 days
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 ${
                                processing ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-indigo-500/30'
                            }`}
                        >
                            {processing && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-700/80"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-slate-900/60 text-gray-500">Don't have an account?</span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href={route('register')} className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
}
