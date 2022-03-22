

import Image from 'next/image';
import Link from 'next/link';

const PizzaCard = ({pizza}) => {
    return (
        <div className='flex flex-col items-center w-[230px] mb-2 group'>
            <Link href = {`/product/${pizza._id}`} passHref>
                <div  className='relative w-[200px] h-[200px] cursor-pointer'>
                    <Image src = {pizza.img} layout='fill' objectFit='contain' alt = "" />
                </div>
            </Link>
            <p className='text-orange text-2xl mt-2 font-bold group-hover:underline'>{pizza.title}</p>
            <p className='text-xl text-slate-700 font-semibold my-3'>${pizza.prices[0]}</p>
            <p className='text-sm text-[#444] sm:text-base'>{pizza.desc}</p>
        </div>
    );
}

export default PizzaCard;