'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';

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

    // Toggle theme function using next-themes
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


const router = useRouter() ;

    const handleLogOut = async () => {
        await authClient.signOut();

        router.push('/')
    }

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">

            {/* Main navbar row */}
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 flex-shrink-0">
                        <Image
                            src="/ideavaultLogo.png"
                            alt="IdeaVault Logo"
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>
                    <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
                        Idea<span className='text-green-500'>Vault</span>
                    </span>
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                ${pathname === href
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right side: Theme Toggle + Profile + Hamburger */}
                <div className="flex items-center gap-3">

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all min-w-[34px] min-h-[34px] flex items-center justify-center"
                        aria-label="Toggle Theme"
                    >
                        {mounted ? (
                            theme === 'dark' ? (
                                // Sun Icon for Light Mode
                                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
                                </svg>
                            ) : (
                                // Moon Icon for Dark Mode
                                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )
                        ) : (
                            <div className="w-4 h-4" />
                        )}
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-full border transition-all
                                ${dropdownOpen
                                    ? 'border-emerald-300 ring-2 ring-emerald-50 dark:ring-emerald-950/30'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500'
                                }`}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                JU
                            </div>
                            <span className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-300 pr-1">
                                Juhair
                            </span>
                            <svg
                                className={`w-3 h-3 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-50">
                                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 mb-1">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Juhair UI</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">juhair@example.com</p>
                                </div>

                                <Link
                                    href="/profile"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <span className="text-base">👤</span>
                                    Profile
                                </Link>

                                <div className="my-1.5 mx-3 h-px bg-slate-100 dark:bg-slate-700" />

                                <button

                                    onClick={() => {
                                        setDropdownOpen(false);
                                        handleLogOut();
                                    }} className="flex items-center gap-3 w-full mx-2 px-3 py-2.5 rounded-xl text-sm text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                    style={{ width: 'calc(100% - 16px)' }}
                                >
                                    <span className="text-base">🚪</span>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Hamburger (mobile only) */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex flex-col gap-1 bg-white dark:bg-slate-900">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                                ${pathname === href
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;