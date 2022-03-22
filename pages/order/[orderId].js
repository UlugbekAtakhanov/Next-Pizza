
import axios from 'axios';
import Image from 'next/image';
import {motion} from "framer-motion"

const Order = ({order}) => {
    return (
        <div className = "mt-[100px]">
            <div className="xl:container xl:mx-auto py-12 lg:flex lg:justify-center gap-8 lg:items-start">

                <div className='flex flex-col gap-4 max-w-[300px] mx-auto lg:mx-0 lg:w-[350px]'>
                    <div className=' p-3 flex flex-col gap-2 rounded-lg shadow-custom1'>
                            <div className='sm:flex justify-between'>
                                <p className='text-black font-semibold'>Order ID</p>
                                <p className=''>{order._id}</p>
                            </div>
                            <div className='sm:flex justify-between'>
                                <p className='text-black font-semibold'>Customer</p>
                                <p className=''>{order.customer}</p>
                            </div>
                            <div className='sm:flex justify-between'>
                                <p className='text-black font-semibold'>Address</p>
                                <p className=''>{order.address}</p>
                            </div>
                            <div className='sm:flex justify-between'>
                                <p className='text-black font-semibold'>Total</p>
                                <p className=''>${order.total}</p>
                            </div>
                    </div>

                    <div className=' p-3 rounded-lg shadow-custom1 space-y-4'>

                        <div className='flex items-center justify-between text-lg'>
                            <div className='relative w-[35px] h-[35px]'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/paid.png" alt='' />
                            </div>
                            <p className='capitalize'>payment</p>
                            <div className='relative w-[20px] h-[20px]'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/checked.png" alt='' />
                            </div>
                        </div>

                        <div className='flex items-center justify-between text-lg opacity-50'>
                            <div className='relative w-[35px] h-[35px]'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/bake.png" alt='' />
                            </div>
                            <p className='capitalize'>In progress</p>
                            <motion.div
                                initial = {{scale: 0}}
                                animate = {{scale: [0.5, 1, 0.5]}}
                                transition = {{repeat: Infinity, duration: 1.5}}
                                className='relative w-[20px] h-[20px] animation__inprogress'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/checked.png" alt='' />
                            </motion.div>
                        </div>

                        <div className='flex items-center justify-between text-lg opacity-50'>
                            <div className='relative w-[35px] h-[35px]'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/bike.png" alt='' />
                            </div>
                            <p className='capitalize'>On the way</p>
                            <div className='relative w-[20px] h-[20px]'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/checked.png" alt='' />
                            </div>
                        </div>

                        <div className='flex items-center justify-between text-lg opacity-50'>
                            <div className='relative w-[35px] h-[35px]'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/delivered.png" alt='' />
                            </div>
                            <p className='capitalize'>Delivered</p>
                            <div className='relative w-[20px] h-[20px]'>
                                <Image className='' layout='fill' objectFit='contain' src="/img/checked.png" alt='' />
                            </div>
                        </div>

                    </div>
                </div>
                    

                <div className='bg-[#333] text-white p-8  font-bold tracking-wide max-w-[500px] mx-auto mt-4 lg:mx-0 lg:w-[500px] lg:mt-0'>
                    <h1 className='text-3xl uppercase mb-4 lg:text-5xl'>cart total</h1>
                    <p className='capitalize space-x-4'>subtotal: <span className='font-light'>$ {order.total}.00</span></p>
                    <p className='capitalize space-x-4'>discount: <span className='font-light'>$ 00.00</span></p>
                    <p className='capitalize space-x-4'>total: <span className='font-light'>$ {order.total}.00</span></p>
                    <button className='bg-white text-emerald-600 uppercase font-semibold w-full mt-2 lg:text-lg lg:font-bold lg:py-1'>PAID</button>
                </div>

            </div>
        </div>
    );
}

export default Order;

export const getServerSideProps = async ({params}) => {
    const {orderId} = params
    const {data} = await axios.get(process.env.PROD_URL+`/api/orders/${orderId}`)

    return {
        props:{
            order: data
        }
    }
}
