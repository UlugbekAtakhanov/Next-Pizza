

import Image from 'next/image';

const Footer = () => {
    return (
        <div className='bg-[#333]'>
            <div className='header__container  lg:flex'>

                <div className='relative lg:flex-[2]'>
                    <Image src = "/img/bg.png" layout='fill' objectFit='cover' objectPosition="right" alt = "" />
                </div>
                <div className='sm:flex gap-4 md:flex-[3] py-8 px-2'>
                    <div className='sm:flex-1'>
                        <h1 className='text-gray-100 text-3xl md:text-5xl uppercase font-semibold text-center sm:text-left md:w-[90%] md:mx-auto'>oh yes, we did. the <span className = "text-amber-500">next-pizza</span>, well baked slice of pizza.</h1>
                    </div>
                    <div className='xs:flex justify-around'>

                        <div className='mt-8 text-white tracking-wide sm:flex-1 sm:mt-0'>
                            <p className='text-2xl text-amber-500 uppercase  font-semibold'>find our restaurants</p>
                            <p className='mb-4'>1654 R. Don Road #304. <br /> NewYork, 85022 <br /> (602) 867-1010</p>
                            <p className='mb-4'>1654 R. Don Road #304. <br /> NewYork, 85022 <br /> (602) 867-1010</p>
                            <p className='mb-4'>1654 R. Don Road #304. <br /> NewYork, 85022 <br /> (602) 867-1010</p>
                            <p className='mb-4'>1654 R. Don Road #304. <br /> NewYork, 85022 <br /> (602) 867-1010</p>
                        </div>
                        <div className='mt-8 text-white tracking-wide sm:flex-1 sm:mt-0'>
                            <p className='text-2xl text-amber-500 uppercase  font-semibold'>working hours</p>
                            <p className='mb-4 uppercase'>monday until friday <br /> 9:00 - 22:00</p>
                            <p className='mb-4 uppercase'>saturday until sunday <br /> 12:00 - 24:00</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;