import React, { useEffect, useState } from 'react'
import Logo from "../../../assets/Logo.png"

function Welcome() {
    return (
        <div className='flex justify-center h-full'>
            <div className='card flex flex-col justify-center align-middle text-center w-full px-3 text-slate-950'>
                <p className='font-normal text-base'>Welcome to Sunergy</p>
                <p className='font-bold text-lg mb-4'>Make The Sun Work For You</p>
                <p className='font-normal text-lg'>At Sunergy, we believe in a sustainable future powered by clean, renewable energy. Our mission is to provide top-quality solar solutions that not only reduce your energy bills but also contribute to a healthier planet.</p>
            </div>
        </div>
    )
}

export default Welcome