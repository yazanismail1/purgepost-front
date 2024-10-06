'use client';
import { eraseCookie, getCookie } from '@/functions/utilities';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const isLoggesIn = () => {
        let loggedIn = getCookie("accessToken") ? true : false;
        let path = router.pathname?.startsWith("/application");
        setIsLoggedIn(loggedIn && path);
        return loggedIn && path;
    }

    const handleLogout = () => {
        eraseCookie("accessToken");
        eraseCookie("uid");
        router.push("/");
    }

    useEffect(() => {
        isLoggesIn();
    }, [])

    return (
        <header>
            <nav className="bg-white border-gray-200 lg:px-6 py-2.5">
                <div className=" md:flex  md:justify-between justify-center">
                    <a href="/" className="flex items-center justify-center">
                        <img src="/logo/Logo only.svg" className="mr-3 h-6 sm:h-9" alt="Purgepost Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Purgepost</span>
                    </a>

                    <div className="flex justify-center items-center order-2 md:mt-0 mt-2">
                        {/* <a href="/login" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-hover     font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Log in</a> */}
                        <a href="https://forms.gle/aHTKBa4U7qsLcQwR7" target="_blank" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-hover    font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Feedback or report an issue</a>
                        <a href="/signup" className="text-white bg-primary hover:bg-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Get started</a>
                    </div>



                </div>
            </nav>
        </header>
    );
};