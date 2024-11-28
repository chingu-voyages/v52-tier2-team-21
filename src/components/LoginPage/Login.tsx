import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

interface SignupDetails {
    email: string;
    pass: string;
}

function Login() {
    const Navigate = useNavigate()
    const userDetails: any = localStorage.getItem("user_info") ? (localStorage.getItem("user_info")) : null;
    const [sigupDetails, setSigupDetails] = useState<SignupDetails>({
        email: "",
        pass: "",
    })

    const handleLogin = () => {
        if (
            !sigupDetails?.email
        ) {
            toast.error("Enter Email first")
            return
        }
        if (
            !sigupDetails?.pass
        ) {
            toast.error("Enter Password first")
            return
        }
        if (userDetails == null ) {
            toast.error("Kindly Register first")
        }
        console.log(sigupDetails?.email,"first",JSON.parse(userDetails)?.email)
        if (sigupDetails?.email != JSON.parse(userDetails)?.email) {
            toast.error("No user found with this email")
        }
        if(
            sigupDetails?.pass != JSON.parse(userDetails)?.pass
        )
        {
            toast.error("Wrong Password Entered")
            return
        }
        if(
            sigupDetails?.email != JSON.parse(userDetails)?.email
        )
        {
            toast.error("Wrong Email Entered")
            return
        }
        toast.success("Login Succesfully")
        setTimeout(() => {
            if(JSON.parse(userDetails)?.role == "Admin")
                {
                    Navigate("/app/admin-dashboard")
                }
                else{
                    Navigate("/app/resident")
                }
        }, 2000);
    }
    return (

        <div className='flex flex-auto justify-center items-center h-[100vh]'>
            <ToastContainer />
            <div
                className="relative flex w-96 flex-col justify-center h-min rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
                <div
                    className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40"
                >
                    <h3
                        className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased"
                    >
                        Sign In
                    </h3>
                </div>
                <div className="flex flex-col gap-4 p-6">


                    <div className="relative h-11 w-full min-w-[200px] ">
                        <input
                            onChange={(e) => {
                                setSigupDetails((prev) => {
                                    return {
                                        ...prev,
                                        email: e.target.value
                                    }
                                })
                            }}
                            type='email'
                            value={sigupDetails?.email}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input

                            onChange={(e) => {
                                setSigupDetails((prev) => {
                                    return {
                                        ...prev,
                                        pass: e.target.value
                                    }
                                })
                            }}
                            type='password'
                            value={sigupDetails?.pass}

                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                            Password
                        </label>
                    </div>

                </div>
                <div className="p-6 pt-0">
                    <button
                        onClick={() => handleLogin()}
                        data-ripple-light="true"
                        type="button"
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Sign In
                    </button>
                    <p
                        className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased"
                    >
                        Don't have an account?
                        <a
                            className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased cursor-pointer"
                            onClick={() => Navigate("/")}
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login