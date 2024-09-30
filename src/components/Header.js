'use client';
import { eraseCookie, getCookie } from '@/functions/utilities';
import React from 'react';


export default function Header() {
    const isLoggesIn = () => {
        let loggedIn = getCookie("accessToken") ? true : false;
        let path = window.location.pathname.startsWith("/application");
        return loggedIn && path;
    }

    const handleLogout = () => {
        eraseCookie("accessToken");
        eraseCookie("uid");
        window.location.href = "/";
    }

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <img src="/logo/Logo only.svg" className="mr-3 h-6 sm:h-9" alt="Purgepost Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Purgepost</span>
                    </a>
                    {
                        isLoggesIn() ? (
                            <div className="flex items-center lg:order-2">
                                <a href="https://forms.gle/aHTKBa4U7qsLcQwR7" target="_blank" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-hover    font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Feedback or report an issue</a>
                                <a onClick={() => handleLogout()} className="text-white bg-primary hover:bg-hover hover:cursor-pointer focus:ring-4 focus:ring-hover font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Logout</a>
                            </div>

                        ) : (
                            <div className="flex items-center lg:order-2">
                                <a href="/login" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-hover     font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Log in</a>
                                <a href="/signup" className="text-white bg-primary hover:bg-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Request access</a>
                            </div>
                        )

                    }

                </div>
            </nav>
        </header>
    );
};