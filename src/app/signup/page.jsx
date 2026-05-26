'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';



export const metadata = {
  title: "IdeaVault – Sign Up",
  description: "This is Sign Up page of IdeaVault",
};



const SignupPage = () => {

    const searchParams = useSearchParams();
    const destination = searchParams.get('callbackUrl') || '/';

    const [password, setPassword] = useState('');

    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    const handleSubmit = async (e) => {

        e.preventDefault();
        // console.log(e.currentTarget)
        const formData = new FormData(e.currentTarget);
        // console.log(formData)

        const signUpData = Object.fromEntries(formData.entries())
        // console.log(signUpData)


        const { data, error } = await authClient.signUp.email({

            ...signUpData,

        }
        );

        if (error) {
            toast.error(error.message);
            return;
        } else {
            toast.success('Successful sign up')
        }

        window.location.href = destination;

        }


        
        const handleGoogleSignUp = async () => {
            await authClient.signIn.social({
                provider: "google",
            });

    };

    return (
        <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-colors duration-300">
            <div className="max-w-5xl w-full bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/50 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

                {/* Left Column) */}
                <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-10 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200/60 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 overflow-hidden">

                    <div className="absolute top-0 right-0 -mt-24 -mr-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />


                    <div className="relative z-10 flex items-center gap-2.5">
                        <div className="p-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <Image
                                width={32}
                                height={32}
                                src="/ideaVaultLogo.png"
                                alt="IdeaVault Logo"
                                className="h-6 w-auto object-contain"
                            />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                            Idea<span className="text-emerald-500 dark:text-emerald-400">Vault</span>
                        </span>
                    </div>


                    <div className="relative z-10 my-auto max-w-sm space-y-3.5">
                        <h1 className="text-3xl font-bold tracking-tight leading-snug text-zinc-900 dark:text-zinc-50">
                            Empower Your Capital of Innovations.
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-light text-sm">
                            Join the elite ecosystem of visionary developers, industry experts, and startup founders validation space. Transform raw thoughts into scalable enterprises.
                        </p>
                    </div>


                    <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-800/80 pt-5">
                        {/* <span>© IdeaVault Global Repo</span>
                        <span className="font-mono">v1.0.0</span> */}
                    </div>
                </div>


                <div className="p-6 sm:p-10 md:p-12 lg:col-span-7 flex flex-col justify-center bg-white dark:bg-zinc-900">
                    <div className="w-full max-w-md mx-auto space-y-7">

                        {/* Form Header */}
                        <div className="space-y-1.5">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                                Create account
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
                                Get started with your free developer innovation workspace today.
                            </p>
                        </div>

                        {/* Registration Form Core Structure */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Profile Name Input Frame */}
                            <div className="space-y-1.5">
                                <label htmlFor="fullName" className="text-[11px] font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    className="w-full px-3.5 py-2.5 bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Security Credentials: Email Input Frame */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-[11px] font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                                    Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="w-full px-3.5 py-2.5 bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Photo URL Input Frame */}
                            <div className="space-y-1.5">
                                <label htmlFor="photoUrl" className="text-[11px] font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                                    Profile Photo URL
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="image"
                                    placeholder="https://images.unsplash.com/photo-example"
                                    className="w-full px-3.5 py-2.5 bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Security Credentials: Password Input Frame */}
                            <div className="space-y-1.5">
                                <label htmlFor="password" className="text-[11px] font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                                    Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-3.5 py-2.5 bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-200 text-sm"
                                />


                                {password.length > 0 && (
                                    <div className="mt-2.5 p-3 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/40 rounded-xl space-y-2 transition-all duration-200">
                                        <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Password Requirements:</p>


                                        <div className="flex items-center gap-2 text-xs">
                                            <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${hasMinLength ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                                            <span className={`transition-colors duration-200 ${hasMinLength ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                                At least 6 characters
                                            </span>
                                        </div>

                                        {/* Requirement 2: Uppercase Letter */}
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${hasUppercase ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                                            <span className={`transition-colors duration-200 ${hasUppercase ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                                At least one uppercase letter (A-Z)
                                            </span>
                                        </div>

                                        {/* Requirement 3: Lowercase Letter */}
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${hasLowercase ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                                            <span className={`transition-colors duration-200 ${hasLowercase ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                                At least one lowercase letter (a-z)
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-medium rounded-xl shadow-sm shadow-emerald-600/10 dark:shadow-emerald-500/5 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
                            >
                                Create Account
                            </button>
                        </form>


                        <div className="relative flex items-center py-1">
                            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
                            <span className="flex-shrink mx-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                Or
                            </span>
                            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
                        </div>

                        <button
                        onClick={handleGoogleSignUp}
                            type="button"
                            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 text-sm cursor-pointer"
                        >
                            <FcGoogle className="h-4 w-4" />
                            Sign up with Google
                        </button>


                        <p className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-4 decoration-zinc-200 dark:decoration-zinc-800 hover:decoration-emerald-500 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignupPage;