import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import {useRouter} from 'next/router';
import { useDispatch } from "react-redux";
import { reset } from "../redux/cartSlice";


const CashPay = ({cash, setCash, cart}) => {
    
    const router = useRouter()
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const orderSubmitHandler = async (data) => {
        const product = {...data, total: cart.total, method: 1}
        console.log(product)
        
        try {
            const {data} = await axios.post("http://localhost:3000/api/orders", product)
            router.push(`/order/${data._id}`)
            dispatch(reset())
        } catch (error) {
            console.log(error.response)
        }
    }


    return (
        <div className=" fixed inset-0 bg-black/60 z-[999] grid place-content-center p-4  backdrop-blur-md">
            <Transition.Child
                show={cash.toString()}
                enter="duration-300 delay-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"

            >
                <div className="bg-white max-w-[500px] p-8 rounded shadow-custom1">
                    <p className='text-center text-3xl mb-4'>You will pay ${cart.total} after delivery</p>

                    <form  className='flex flex-col' onSubmit={handleSubmit(orderSubmitHandler)}>
                        <label className='mt-4 font-semibold tracking-wider' htmlFor="fullname">Full Name</label>
                        <input className='border border-black p-1 text-black tracking-wider capitalize rounded'  {...register("customer", { required: true, maxLength: 20 })} />
                        {errors.customer?.type === 'required' && <p className="text-red-500 font-semibold tracking-wide">Full name is required</p>}

                        <label className='mt-4 font-semibold tracking-wider' htmlFor="phone">Phone Number</label>
                        <input className='border border-black p-1 text-black tracking-wider capitalize rounded'  {...register("phone", { required: true, maxLength: 20 })} />
                        {errors.phone?.type === 'required' && <p className="text-red-500 font-semibold tracking-wide">Phone number is required</p>}

                        <label className='mt-4 font-semibold tracking-wider' htmlFor="address">Address</label>
                        <input className='border border-black p-1 text-black tracking-wider capitalize rounded'  {...register("address", { required: true, maxLength: 20 })} />
                        {errors.address?.type === 'required' && <p className="text-red-500 font-semibold tracking-wide">Address is required</p>}

                        <div className='flex justify-center mt-6 gap-4'>
                            <motion.button
                                whileHover={{scale: 1.1}}
                                whileTap = {{scale: .9}}
                                type="submit" className='bg-green-500  py-2 px-6 text-white rounded shadow-lg shadow-green-500'>Order</motion.button>
                            <motion.button
                                whileHover={{scale: 1.1}}
                                whileTap = {{scale: .9}}
                                onClick={() => setCash(false)} className='bg-orange  py-2 px-6 text-white rounded shadow-lg shadow-orange'>Close</motion.button>
                        </div>
                    </form>

                </div>
            </Transition.Child>
        </div>
    );
}

export default CashPay;