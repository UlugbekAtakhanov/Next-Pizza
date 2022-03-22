
import { useState } from 'react';
import {useSelector} from "react-redux"

import Image from 'next/image';
import Link from 'next/link';

import {motion} from "framer-motion"

import {AiOutlineClose} from "react-icons/ai"
import {GiHamburgerMenu, GiShoppingCart} from "react-icons/gi"

const sidebar = [
    {page:"homepage", url: "/"},
    {page:"admin", url: "/admin"},
    {page:"menu", url: "/menu"},
    {page:"events", url: "/events"},
    {page:"blog", url: "/blog"},
    {page:"contact", url: "/contact"}
]



const Navbar = () => {

    const {quantity} = useSelector(state => state.cart)
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className="bg-orange fixed top-0 w-full z-[999] h-[100px]">
            <div className="xl:container xl:mx-auto flex items-center w-full h-full">

                <div className='hidden sm:flex items-center px-4 w-full'>
                    <div className='hidden md:flex items-center gap-2 text-white '>
                        <div className='bg-white w-16 h-16 rounded-full flex items-center justify-center'>
                            <div className='relative w-2/3 aspect-[1/1]'>
                                <Image src = "/img/telephone.png" layout='fill' objectFit='contain' alt = "" />
                            </div>
                        </div>
                        <div>
                            <p>ORDER NOW!</p>
                            <p>012 345 678</p>
                        </div>
                    </div>

                    <ul className='flex items-center flex-1 gap-5 md:gap-6 text-lg  text-white capitalize justify-center'>
                        <li><Link className='hover:text-grey-color' href="/">homepage</Link></li>
                        <li><Link className='hover:text-grey-color' href="/admin">Admin</Link></li>
                        <li><a className='hover:text-grey-color' href="#menu">menu</a></li>
                        <h1  className='font-dance text-4xl font-extrabold text-white'>Next-pizza</h1>
                        <li><a className='hover:text-grey-color' href="#events">events</a></li>
                        <li><a className='hover:text-grey-color' href="#blog">blog</a></li>
                        <li><a className='hover:text-grey-color' href="#contact">contact</a></li>
                    </ul>

                    <Link href = "/cart">
                        <div className='relative group'>
                            <GiShoppingCart className='text-white text-4xl cursor-pointer' />
                            <span className='absolute group-hover:bg-gray-200 transition-all duration-200 bg-white top-[-5px] right-[-10px] text-orange font-bold w-6 h-6 rounded-full text-xs grid place-content-center'>{quantity}</span>
                        </div>
                    </Link>

                </div>


                <div className='flex items-center justify-between p-4 sm:hidden w-full'>
                    <h1 className='font-dance text-4xl font-extrabold text-white'>Next-pizza</h1>
                    <div className='flex items-center gap-6'>
                        <div className='relative group'>
                        <Link href = "/cart">
                                <GiShoppingCart className='text-white text-4xl cursor-pointer' />
                        </Link>
                            <span className='absolute group-hover:bg-gray-200 transition-all duration-200 bg-white top-[-5px] right-[-10px] text-orange font-bold w-6 h-6 rounded-full text-xs grid place-content-center'>{quantity}</span>
                        </div>
                        <GiHamburgerMenu className='text-white text-xl cursor-pointer' onClick = {() => setIsOpen(true)} />
                    </div>
                </div>

                <motion.div
                    initial = {{width: 0}}
                    animate = {{width: isOpen ? "80%" : 0}}
                    className=" fixed z-[11] top-0 overflow-hidden right-0 bottom-0 h-full  bg-orange/70 backdrop-blur-sm ">
                            <div
                                onClick={() => setIsOpen(false)}
                                className=" text-gray-color hover:text-secondary-color cursor-pointer  flex justify-end p-4">
                                <motion.span whileHover={{rotate: "180deg", scale: .8}} >
                                    <AiOutlineClose className='text-2xl text-white' />
                                </motion.span>
                            </div>
                    <motion.ul className="">
                        {
                            sidebar.map((item, index) => (
                                <Link href={item.url}  key = {index}>
                                    <li><motion.a 
                                    whileHover={{scale: 1.05}}
                                    onClick={() => setIsOpen(false)} className="text-white font-medium text-xl hover:text-gray-100 tracking-widest  capitalize block py-3 px-8">{item.page}</motion.a></li>
                                </Link>
                            ))
                        }

                    </motion.ul>
                    <div className='relative h-full z-[-1] top-[-250px] left-[20px] aspect-[1/1]'>
                        <Image src="/img/size.png" layout='fill' objectFit='cover'  alt = "" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

export default Navbar;