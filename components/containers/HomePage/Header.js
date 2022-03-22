
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const img = ["hot & spicy", "cold & spicy", "both & spicy"]


const Header = () => {
    const imgRef = useRef()
    const [index, setIndex] = useState(0)

    const [width, setWidth] = useState("")

    const scrollHandler = (direction) => {
        if (direction === "left") {
            setIndex(index !== 0 ? index-1 : 2)
        }
        if (direction === "right") {
            setIndex(index !== 2 ? index+1 : 0)
        }
    }

    useEffect(() => {
        setWidth(imgRef?.current?.offsetWidth)
        window.addEventListener("resize", () => {
            setWidth(imgRef?.current?.offsetWidth)
        })
    }, [])


    return (
        <div className='bg-orange mt-[100px] header__container lg:flex items-center'>
        
            <div className="xl:container xl:mx-auto sm:relative  overflow-x-hidden lg:w-full">
                <div className='absolute top-1/2 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] -translate-y-1/2 left-0 z-[2] cursor-pointer ' onClick = {() => scrollHandler("left")}>
                    <Image src="/img/arrowl.png" alt='' layout='fill' objectFit='contain'  />
                </div>
                <div className=' box-border flex sm:items-center transition-all duration-1000 '
                       style={{transform: `translateX(${-width*index}px)`, width: `${100*img.length}%`}}>
                        {img.map((item, index) => {
                            return (
                                <div  ref = {imgRef} className='flex-1 flex flex-col lg:flex-row items-center lg:justify-center py-8' key={index}>
                                    <div  className='flex flex-col items-center border lg:border-none text-white relative py-8 z-[1] uppercase w-[90%] lg:w-[40%] mx-auto lg:mx-0 p-2 backdrop-blur lg:backdrop-blur-0 rounded tracking-widest'>
                                        <h1 className='text-xl sm:text-4xl  leading-[1]  pl-1'>{item}</h1>
                                        <h1 className='text-6xl sm:text-[140px] font-bold leading-[.7]  p-0'>Pizza</h1>
                                        <div className='border-2 mt-5 mb-6 ml-1 w-16'></div>
                                        <p className='text-2xl border-b ml-1 w-max font-bold'>50% off</p>
                                        <p className='text-2xl border-b ml-1 w-max font-bold'>order now</p>
                                        <p className='text-3xl ml-1 w-max font-bold font-dance normal-case tracking-wide mt-12'>Next-pizza</p>
                                    </div>
                                    <div className='relative top-[-70px] lg:top-0 lg:w-1/2 z-0 w-[250px] h-[250px]  xs:w-[400px] xs:h-[400px]  md:w-[500px] md:h-[500px]'>
                                        <Image src={"/img/pizza.png"} layout = "fill" objectFit='contain' alt = "" />
                                    </div>
                                </div>
                            )
                        })}
                </div>

                <div className='absolute top-1/2 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] -translate-y-1/2 right-0 z-[1] cursor-pointer'  onClick = {() => scrollHandler("right")}>
                    <Image src="/img/arrowr.png" alt='' layout='fill' objectFit='contain' />
                </div>

            </div>
        
        </div>
    );
}

export default Header;