

import Head from 'next/head'
import axios from "axios"

import Header from '../components/containers/HomePage/Header'
import PizzaList from '../components/containers/HomePage/PizzaList'


export default function Home({pizzaList}) {
  return (
    <div>

      <Header />
      <PizzaList pizzaList = {pizzaList}  />
      
    </div>
  )
}


export const getServerSideProps = async () => {
  const {data} = await axios.get(process.env.PROD_URL+"/api/products")

  return {
    props:{
      pizzaList:data
    }
  }
}