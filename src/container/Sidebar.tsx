import React, { useEffect, useState } from 'react'
import Logo from "../components/assets/Logo.png"
import { useNavigate } from 'react-router-dom'
// import Button from './Button';


function Sidebar(props: any) {
    const {
        activeBtn,
        setActiveBtn,
        setisSidebarOpen,
        isSidebarOpen,
        screen
    } = props

    const Navigate = useNavigate()
    const sidebarMenu = [
        {
            title: "Home",
            path: "/app/admin-dashboard",
            icon: <svg
                stroke="#000000"
                className="icon glyph size-6"
                id="dashboard-alt"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
            >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                    <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                    <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                </g>
            </svg>,
        },
        {
            title: "Appointment",
            path: "/app/admin-appointment-request",
            icon: <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="size-6"
            >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        fill="#000000"
                        d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"
                    ></path>
                    <path
                        fill="#000"
                        d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"
                    ></path>
                </g>
            </svg>,
        },
        {
            title: "Schedule",
            path: "/app/admin-appointment-schedule",
            icon: <svg
                stroke="#000000"
                className="icon glyph size-6"
                id="dashboard-alt"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
            >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
                    <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
                    <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
                </g>
            </svg>,
        },
    ]

    useEffect(() => {
        const Path = window.location.href
        if (Path?.includes("admin-dashboard")) {
            setActiveBtn("Home")
        }
        else if (Path?.includes("admin-appointment-request")) {
            setActiveBtn("Appointment")
        }
        else if (Path?.includes("admin-appointment-schedule")) {
            setActiveBtn("Schedule")
        }
    }, [])
    return (
        <div className="card w-72 h-[100vh] overflow-y-auto bg-white p-5 shadow-md shadow-purple-200/50 ">
            {screen <= 938 &&
                <div className='flex justify-end'>
                    <svg
                    onClick={() => setisSidebarOpen(!isSidebarOpen)}
                    className="h-8 w-8 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                </div>}
            <div className='flex flex-col items-center mb-2 divide-y'>
                <img height={100} width={100} src={Logo} className='mr-3' />
                <hr className="mt-3 h-0.5 w-full border-t-0 bg-neutral-100 dark:bg-white/10" />
            </div>
            <ul className="w-full flex flex-col gap-2">
                {sidebarMenu?.map((item, index) => (
                    <li
                        key={index}
                        className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap divide-y"
                    >
                        <button
                            onClick={() => {
                                setActiveBtn(item?.title)
                                Navigate(item?.path)
                            }}
                            className={`flex gap-4 px-4 py-3 size-full text-gray-700 font-semibold group rounded-full hover:bg-purple-100 hover:shadow-inner duration-300 relative ${activeBtn == item?.title ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white" : ""} cursor-pointer overflow-hidden`}>
                            <div className={`absolute opacity-0 ${activeBtn == item?.title ? "opacity-100 top-1 -right-2 scale-150" : "right-12 top-12 opacity-0"} z-10 w-16 h-16 rounded-full duration-700  bg-lime-50`}></div>
                            <div className={`absolute opacity-0 ${activeBtn == item?.title ? "opacity-100 -top-1 -right-2 scale-150" : "right-20 -top-6 opacity-0"} z-10 w-12 h-12 rounded-full duration-700  bg-sky-800`}></div>
                            <div className={`absolute opacity-0 ${activeBtn == item?.title ? "opacity-100 -top-1 -right-2 scale-150" : "right-32 top-6 opacity-0"} z-10 w-8 h-8 rounded-full duration-700  bg-indigo-500`}></div>
                            <div className={`absolute opacity-0 ${activeBtn == item?.title ? "opacity-100 -top-1 -right-2 scale-150" : "right-2 top-12 opacity-0"} z-10 w-4 h-4 rounded-full duration-700  bg-fuchsia-400`}></div>
                            <div className={`flex gap-4 ${activeBtn == item?.title ? "stroke-white fill-white" : ""}`}>
                                {item?.icon}
                                <p className="z-10 ">{item?.title}</p>
                            </div>
                        </button>
                        <hr className="mt-3 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar