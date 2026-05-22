'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

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
    const dropdownRef = useRef(null);

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

    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">

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
                    <span className="font-bold text-lg tracking-tight">
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
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right side: Profile + Hamburger */}
                <div className="flex items-center gap-3">

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-full border transition-all
                                ${dropdownOpen
                                    ? 'border-emerald-300 ring-2 ring-emerald-50'
                                    : 'border-slate-200 hover:border-emerald-300'
                                }`}
                        >
                            {/* Avatar with deep green gradient */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                JU
                            </div>
                            <span className="hidden sm:block text-sm font-semibold text-slate-700 pr-1">
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
                            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">

                                {/* User info header */}
                                <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                                    <p className="text-sm font-semibold text-slate-800">Juhair UI</p>
                                    <p className="text-xs text-slate-400 mt-0.5">juhair@example.com</p>
                                </div>

                                <Link
                                    href="/profile"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                                >
                                    <span className="text-base">👤</span>
                                    Profile
                                </Link>

                                <div className="my-1.5 mx-3 h-px bg-slate-100" />

                                <button
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        // call your logout function here
                                    }}
                                    className="flex items-center gap-3 w-full mx-2 px-3 py-2.5 rounded-xl text-sm text-red-500 font-medium hover:bg-red-50 transition-colors"
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
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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
                <div className="md:hidden border-t border-slate-100 px-6 py-3 flex flex-col gap-1">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                                ${pathname === href
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'text-slate-600 hover:bg-slate-100'
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