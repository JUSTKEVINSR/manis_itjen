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
    const [isMinimized, setIsMinimized] = useState(false);


    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar (Desktop) */}
            <aside
                className={`hidden bg-white border-r border-gray-200 sm:flex sm:flex-col shrink-0 sticky top-0 h-screen transition-all duration-300 ease-in-out ${isMinimized ? 'w-20' : 'w-64'
                    }`}
            >
                <div className={`flex h-16 shrink-0 items-center border-b border-gray-100 px-4 ${isMinimized ? 'justify-center' : 'justify-between'
                    }`}>
                    {!isMinimized && (
                        <Link href="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-indigo-600" />
                            <span className="font-bold text-xl text-gray-800">Manis</span>
                        </Link>
                    )}
                    {isMinimized && (
                        <Link href="/">
                            <ApplicationLogo className="block h-8 w-auto fill-current text-indigo-600" />
                        </Link>
                    )}

                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors ${isMinimized ? 'mt-2' : ''
                            }`}
                    >
                        <svg className={`h-5 w-5 transition-transform duration-300 ${isMinimized ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                <div className="py-6 px-3 flex-1 overflow-y-auto overflow-x-hidden">
                    <nav className="space-y-2">
                        <SidebarLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            isMinimized={isMinimized}
                            label="Dashboard"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </SidebarLink>

                        <SidebarLink
                            href={route('karyawan-data')}
                            active={route().current('karyawan-data')}
                            isMinimized={isMinimized}
                            label="Data Karyawan"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </SidebarLink>

                        <SidebarLink
                            href={route('karyawan-penjab')}
                            active={route().current('karyawan-penjab')}
                            isMinimized={isMinimized}
                            label="Penanggung Jawab"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </SidebarLink>

                        <div className={`mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider transition-opacity duration-300 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                            Inventory
                        </div>

                        <SidebarLink
                            href={route('inventory-data')}
                            active={route().current('inventory-data')}
                            isMinimized={isMinimized}
                            label="Inventory Bub"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </SidebarLink>

                        <SidebarLink
                            href={route('inventory-out')}
                            active={route().current('inventory-out')}
                            isMinimized={isMinimized}
                            label="Inventory Out"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                        </SidebarLink>

                        <SidebarLink
                            href={route('inventory-recall')}
                            active={route().current('inventory-recall')}
                            isMinimized={isMinimized}
                            label="Inventory Recall"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </SidebarLink>

                        <div className={`mt-6 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider transition-opacity duration-300 ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                            System
                        </div>

                        <SidebarLink
                            href={route('file-tracking')}
                            active={route().current('file-tracking')}
                            isMinimized={isMinimized}
                            label="File Tracking"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </SidebarLink>

                        <SidebarLink
                            href={route('templates.index')}
                            active={route().current('templates.index')}
                            isMinimized={isMinimized}
                            label="Manage Templates"
                        >
                            <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                        </SidebarLink>
                    </nav>
                </div>

                {/* Optional Bottom Sidebar Profile or Info */}
                <div className="border-t border-gray-100 p-4 shrink-0 transition-all duration-300">
                    <div className={`text-xs text-gray-500 text-center transition-opacity duration-300 ${isMinimized ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                        Manis Itjen Sistem &copy; 9999
                    </div>
                    {isMinimized && (
                        <div className="text-[10px] font-bold text-indigo-600 text-center">
                            MANIS
                        </div>
                    )}
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

function SidebarLink({ href, active, isMinimized, label, children }: {
    href: string,
    active: boolean,
    isMinimized: boolean,
    label: string,
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group relative ${active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            <div className={`flex items-center justify-center ${isMinimized ? 'mx-auto' : 'mr-3'}`}>
                {children}
            </div>

            <span className={`whitespace-nowrap transition-all duration-300 ${isMinimized
                    ? 'opacity-0 w-0 overflow-hidden translate-x-4'
                    : 'opacity-100 w-auto translate-x-0'
                }`}>
                {label}
            </span>

            {/* Tooltip when minimized */}
            {isMinimized && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {label}
                </div>
            )}
        </Link>
    );
}

