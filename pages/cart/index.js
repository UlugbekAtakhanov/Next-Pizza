
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

import { Fragment, useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import CashPay from '../../components/CashPay';

const Cart = () => {

    const {cart} = useSelector(state => state)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)


    // PayPal =============================================================
    const amount = "2";
    const currency = "USD";
    const style = {"layout":"vertical"};

    const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function () {
                            // Your code here after capture the order
                        });
                    }}
                />
            </>
        );
    }

    //============================================================



    return (
        <div className = "mt-[100px]">
            <div className="xl:container xl:mx-auto header__container py-2 lg:flex lg:items-start lg:py-12 lg:px-4 lg:gap-12">


                <div className='flex flex-col gap-4 items-center sm:flex-row sm:items-stretch sm:flex-wrap sm:justify-center lg:flex-[3] lg:justify-end'>
                    {cart.products.length ? cart.products.map((item, index) => {
                        return (

                            <div key={index} className='shadow-md rounded-lg p-2 flex flex-col gap-1 border min-w-[205px]'>
                                <div className='relative w-[150px] aspect-[1/1] mx-auto col-span-2 '>
                                    <Image layout='fill' objectFit='contain' src={item.img} alt=''  />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black font-semibold'>Name</p>
                                    <p>{item.title}</p>
                                </div>
                                <div className='flex items-start justify-between'>
                                    <p className='text-black font-semibold flex-1'>Extras</p>
                                    <p className='flex-1 text-right'>

                                        {item.extras.length ? item.extras.map(extra => {
                                        return (
                                            <span key={extra._id} className=''>{extra.text}, </span>
                                            )
                                        }) : <span>no extras</span>}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black font-semibold'>Quantity</p>
                                    <p>{item.quantity}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black font-semibold'>Price</p>
                                    <p>{item.price}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-black font-semibold'>Total</p>
                                    <p>{Number(item.quantity) * item.price}</p>
                                </div>
                            </div>
                        )
                    }) : <p className='text-xl mt-2 text-orange font-semibold tracking-wider'>There is no product in the cart..</p>}
                    
                </div>

                <div className='bg-[#333] text-white my-2 p-8  font-bold tracking-wide max-w-[500px] mx-auto lg:flex-[2]'>
                    <h1 className='text-3xl uppercase mb-4 lg:text-5xl'>cart total</h1>
                    <p className='capitalize space-x-4'>subtotal: <span className='font-light'>${cart.total || "00.00"}</span></p>
                    <p className='capitalize space-x-4'>discount: <span className='font-light'>$00.00</span></p>
                    <p className='capitalize space-x-4'>total: <span className='font-light'>${cart.total || "00.00"}</span></p>

                    {open ? (
                        <div>
                            <button onClick={() => setCash(true)}  className='bg-white text-orange mb-2 uppercase font-semibold w-full mt-2 lg:text-lg lg:font-bold lg:py-1 rounded'>cash on delivery</button>
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "test",
                                    components: "buttons",
                                    currency: "USD"
                                }}
                            >
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>
                        </div>
                    ) : (
                        <button disabled = {cart.products.length > 0 ? false : true} style = {{cursor: cart.products.length ? "pointer" : "not-allowed", opacity: cart.products.length ? "100%" : "70%"}}   onClick={() => setOpen(true)} className='bg-white text-orange mb-2 rounded uppercase font-semibold w-full mt-2 lg:text-lg lg:font-bold lg:py-1'>checkout now!</button>
                    )}
                </div>
            </div>

                <Transition.Root show={cash} >
                    <CashPay cash = {cash} setCash = {setCash} cart = {cart} />
                </Transition.Root>

        </div>
    );
}

export default Cart;