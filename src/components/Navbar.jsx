'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { authClient, useSession } from '@/lib/auth-client';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/add-idea', label: 'Add Idea' },
    { href: '/my-ideas', label: 'My Ideas' },
    { href: '/my-interactions', label: 'My Interactions' },
];

const Navbar = () => {
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleLogOut = async () => {
        setDropdownOpen(false);
        setMobileOpen(false);

        await authClient.signOut();

        window.location.href = '/';
    };

    const { data: session, isPending } = useSession();

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-2 min-w-0">
                    <div className="relative w-9 h-9 flex-shrink-0">
                        <Image
                            src="/ideavaultLogo.png"
                            alt="IdeaVault Logo"
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>

                    <span className="font-bold text-base sm:text-lg text-slate-800 dark:text-white truncate">
                        Idea<span className="text-green-500">Vault</span>
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                ${pathname === href
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                        {mounted ? (
                            theme === 'dark' ? (
                                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646" />
                                </svg>
                            )
                        ) : (
                            <div className="w-4 h-4" />
                        )}
                    </button>

                    {!isPending && (
                        !session ? (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-green-500 border border-green-500 rounded-xl"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-xl"
                                >
                                    Signup
                                </Link>
                            </div>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700"
                                >
                                    {session.user.image ? (
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name || 'User'}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-semibold">
                                            {session.user.name?.slice(0, 2).toUpperCase() || 'U'}
                                        </div>
                                    )}

                                    <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {session.user.name}
                                    </span>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-50">

                                        <Link
                                            href="/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block mx-2 px-3 py-2 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                                        >
                                            Profile
                                        </Link>

                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left mx-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                            style={{ width: 'calc(100% - 16px)' }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    )}

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        {mobileOpen ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 px-4 py-3 flex flex-col gap-1 bg-white dark:bg-slate-900">

                    {!session && !isPending && (
                        <div className="flex gap-2 mb-2">
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex-1 px-4 py-2 text-center text-sm font-medium text-green-500 border border-green-500 rounded-xl"
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                onClick={() => setMobileOpen(false)}
                                className="flex-1 px-4 py-2 text-center text-sm font-medium bg-green-500 text-white rounded-xl"
                            >
                                Signup
                            </Link>
                        </div>
                    )}

                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`px-3 py-2.5 rounded-xl text-sm font-medium
                                ${pathname === href
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {label}
                        </Link>
                    ))}

                    {session && (
                        <>
                            <Link
                                href="/profile"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogOut}
                                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;