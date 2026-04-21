import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden w-64 bg-white border-r border-gray-200 sm:flex sm:flex-col shrink-0 sticky top-0 h-screen">
                <div className="flex h-16 shrink-0 items-center justify-center border-b border-gray-100 px-6">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-indigo-600" />
                    </Link>
                </div>

                <div className="py-4 px-3 flex-1 overflow-y-auto">
                    <nav className="space-y-1">
                        <Link
                            href={route('dashboard')}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${route().current('dashboard')
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >

                            Dashboard
                        </Link>

                        <Link
                            href={route('karyawan-data')}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${route().current('karyawan-data')
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >

                            Data Karyawan
                        </Link>

                        <Link
                            href={route('karyawan-penjab')}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${route().current('karyawan-penjab')
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >

                            Karyawan Penanggung Jawab
                        </Link>

                        <Link
                            href={route('inventory-data')}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${route().current('inventory-data')
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >

                            Inventory Bub
                        </Link>

                        <Link
                            href={route('inventory-out')}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${route().current('inventory-out')
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >

                            Inventory Out Bub
                        </Link>





                        {/* Form Link Generator - previously visible as another module perhaps */}
                    </nav>
                </div>

                {/* Optional Bottom Sidebar Profile or Info */}
                <div className="border-t border-gray-100 p-4">
                    <div className="text-xs text-gray-500 text-center">
                        Manis Itjen Sistem
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <nav className="border-b border-gray-100 bg-white sticky top-0 z-10">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center">
                                {/* Logo on Mobile */}
                                <div className="flex shrink-0 items-center sm:hidden">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-indigo-600" />
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                {/* User Dropdown */}
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route('profile.edit')}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? 'block' : 'hidden') +
                            ' sm:hidden'
                        }
                    >
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-gray-200 pb-1 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
