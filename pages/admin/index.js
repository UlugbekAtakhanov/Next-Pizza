
import axios from "axios"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from "react";

const Admin = ({products, orders}) => {

    const [filteredProducts, setFilteredProducts] = useState(products)

    const deleteProductHandler = async (itemId) => {
        try {
            const {data} = await axios.delete(process.env.PROD_URL+"/api/products/" + itemId)
            setFilteredProducts(filteredProducts.filter(item => item._id !== data._id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-[100px]">
            <p className="text-center p-2">Admin panel is not responsive</p>
            <div className="xl:container xl:mx-auto py-4 flex gap-16 min-h-screen pt-12">
                
                <div className='flex-1'>
                    <h1 className='text-5xl font-semibold mb-4'>Products</h1>
                    <table className='w-full text-sm'>
                        <tr className=''>
                            <th className='w-[70px] text-left'>Image</th>
                            <th className='w-[70px] text-left'>Id</th>
                            <th className='w-[70px] text-left'>Title</th>
                            <th className='w-[50px] text-left'>Price</th>
                            <th className='w-[70px] text-left'>Action </th>
                        </tr>
                            {filteredProducts.length && filteredProducts.map(item => {
                                return (
                                    <tr className='h-16' key={item._id}>
                                        <td>
                                            <div className='relative w-12 h-12'>
                                                <Image src = "/img/pizza.png" layout = "fill" objectFit='contain' />
                                            </div>
                                        </td>
                                        <td>{item._id}</td>
                                        <td>{item.title}</td>
                                        <td>${item.prices[0]}</td>
                                        <td className='space-x-1'>
                                            <motion.button
                                                whileHover = {{scale: 1.1}}
                                                whileTap = {{scale: .9}}
                                                className='bg-green-500 rounded shadow-lg shadow-green-500 text-white py-1 px-3'>edit</motion.button>
                                            <motion.button
                                                onClick={() => deleteProductHandler(item._id)}
                                                whileHover = {{scale: 1.1}}
                                                whileTap = {{scale: .9}}
                                                className='bg-red-500 rounded shadow-lg shadow-red-500 text-white py-1 px-3'>delete</motion.button>
                                        </td>
                                    </tr>
                                )
                            })}

                    </table>
                </div>

                <div className='flex-1'>
                    <h1 className='text-5xl font-semibold mb-4'>Orders</h1>
                    <table className='w-full text-left text-sm'>
                        <tr className=''>
                            <th className='w-[70px]'>Id</th>
                            <th className='w-[70px]'>customer</th>
                            <th className='w-[70px]'>Total</th>
                            <th className='w-[70px]'>Payment</th>
                            <th className='w-[70px]'>Status</th>
                            <th className='w-[70px]'>Action </th>
                        </tr>
                        {orders.length && orders.map(item => {
                            return (
                                <tr className='h-16' key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.customer}</td>
                                    <td>${item.total}</td>
                                    <td>Paid</td>
                                    <td>on the way</td>
                                    <td className='space-x-4'>
                                        <motion.button
                                            whileHover = {{scale: 1.1}}
                                            whileTap = {{scale: .9}}
                                            className='bg-green-500  rounded shadow-lg shadow-green-500 text-white py-1 px-3'>next stage</motion.button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>


            </div>
        </div>
    );
}

export default Admin;



export const getServerSideProps = async () => {

    const products = await axios.get(process.env.PROD_URL+"/api/products")
    const orders = await axios.get(process.env.PROD_URL+"/api/orders")

    return {
        props:{
            products: products.data,
            orders: orders.data
        }
    }
}