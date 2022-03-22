
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

import Image from 'next/image';

const Product = ({pizza}) => {
    const dispatch = useDispatch()

    const [price, setPrice] = useState(pizza?.prices[0])
    const [size, setSize] = useState(0)
    const [extras, setExtras] = useState([])
    const [quantity, setQuantity] = useState(1)


    const changePrice = (difference) => {
        setPrice(price + difference)
    }
    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size]
        setSize(sizeIndex)
        changePrice(difference)
    }
    const handleCheck = (e, option) => {
        const checked = e.target.checked
        if (checked) {
            setPrice(price + option.price[0])
            setExtras(prev => [...prev, option])
        } else {
            setPrice(price - option.price[0])
            setExtras(extras.filter(extra => extra._id !== option._id))
        }

    }


    const addToCartHandler = () => {
        dispatch(addProduct({...pizza, extras, quantity, price}))
    }


    return (
        <div className='xl:container xl:mx-auto header__container mt-[100px] py-8 md:flex md:items-center md:p-4 md:gap-4'>
            
            <div className=' w-[80%]  aspect-[1/1] mx-auto relative md:w-[45%] md:flex-1'> 
                <div className='relative w-full h-full'>
                    <Image src="/img/pizza.png" layout='fill' objectFit='contain'  alt = "" />
                </div>
            </div>

            <div className='p-4 md:flex-1'>
                <p className=' capitalize text-4xl md:text-5xl font-semibold tracking-wider'>{pizza.title}</p>
                <p className='text-2xl text-orange underline my-4'>${price}</p>
                <p className='tracking-wide'>{pizza.desc}</p>
                <p className='text-black text-xl tracking-wider font-bold mt-4 '>Choose the size</p>
                <div className='flex flex-wrap gap-12 my-8'>
                    <div className='relative w-[40px] aspect-[1/1] cursor-pointer' onClick={() => handleSize(0)}>
                        <Image src="/img/size.png" layout='fill' objectFit='contain' alt = "" />
                        <span className='absolute right-[-25px] bg-orange text-white text-xs capitalize rounded-lg tracking-wider px-2'>small</span>
                    </div>
                    <div className='relative w-[50px] aspect-[1/1] cursor-pointer' onClick={() => handleSize(1)}>
                        <Image src="/img/size.png" layout='fill' objectFit='contain' alt = "" />
                        <span className='absolute right-[-30px] bg-orange text-white text-xs capitalize rounded-lg tracking-wider px-2'>medium</span>
                    </div>
                    <div className='relative w-[60px] aspect-[1/1] cursor-pointer' onClick={() => handleSize(2)}>
                        <Image src="/img/size.png" layout='fill' objectFit='contain' alt = "" />
                        <span className='absolute right-[-30px] bg-orange text-white text-xs capitalize rounded-lg tracking-wider px-2'>large</span>
                    </div>
                   
                </div>

                <p className='text-black text-xl tracking-wider font-bold mt-4 '>Choose additional ingredients</p>
                <div className='mt-4 flex flex-wrap gap-4'>
                    {pizza.extraOptions.map(option => {
                        return (
                            <div className='flex items-center capitalize  gap-1' key={option._id}>
                                <input
                                    onChange={(e) => handleCheck(e, option)}
                                    className='p-2 text-orange border-orange/50  rounded focus:ring-orange' type="checkbox" name={option.text} id={option.text} />
                                <label htmlFor="double">{option.text}</label>
                            </div>
                        )
                    })}
                </div>

                <div className='mt-4 flex gap-3'>
                    <input  onChange={(e) => setQuantity(e.target.value)}  className=' w-20 py-2 px-4 focus:border-none focus:ring-orange' type="number" value={quantity} />
                    <button onClick={addToCartHandler} className='bg-orange py-2 px-4 text-white'>Add to cart</button>
                </div>
            </div>
            
        </div>

        
    );
}

export default Product;


export const getServerSideProps = async ({params}) => {
    const {productId} = params
    const {data} = await axios.get(`http://localhost:3000/api/products/${productId}`)

    return {
        props:{
            pizza: data
        }
    }
}
