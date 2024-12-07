import React, { useEffect, useState } from 'react'
import Logo from "../assets/Logo.png"


function Header(props: any) {
    const {
        isSidebarOpen,
        setisSidebarOpen,
        screen
    } = props

    const JsonData: any = localStorage.getItem("user_info") ? (localStorage.getItem("user_info")) : null;
    const userDetails = JSON.parse(JsonData)
    return (
        <div className="z-10">
            <section className="relative">
                <nav
                    className="bg-[#81BFDA] bg-opacity-20 shadow-md backdrop-filter backdrop-blur-lg"
                >
                    <div className={`px-5 xl:px-12 py-4 flex justify-${screen <= 938 ? "between" : "end"} w-full items-center`}>
                       {screen <= 938 &&
                        <svg 
                        onClick={() => setisSidebarOpen(!isSidebarOpen)}
                        className="cursor-pointer h-6 w-6 text-white hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}

                        <div className="relative inline-block group">
                            <svg className="cursor-pointer h-6 w-6 text-white hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <div
                                className="absolute w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full right-0 top-6 mb-2 transition-all duration-300 ease-in-out"
                            >
                                <div
                                    className="p-4 z-20 right-0 mt-2 w-64 text-black bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                                >
                                    <div className="flex flex-col align-middle items-center mb-3">
                                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden ring-2 ring-gray-30 bg-gray-100 rounded-full dark:bg-gray-600">
                                            <span className="font-medium text-gray-600 dark:text-gray-300">{userDetails?.f_name[0] + userDetails?.l_name[0]}</span>
                                        </div>
                                        <p className="pt-1 divide-y">
                                            {`Hi, ${userDetails?.f_name}!`}
                                        </p>

                                    </div>
                                    <ul className="space-y-1 flex flex-col align-middle divide-y">
                                        <li className="py-1">{userDetails?.email}</li>
                                        <li className="py-1">{userDetails?.role}</li>
                                        <li
                                            className="pt-1 flex items-center gap-3 cursor-pointer">
                                            <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
                                            </svg>
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>
            </section>
        </div>
    )
}

export default Header