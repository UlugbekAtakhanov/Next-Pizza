

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
  const {data} = await axios.get("http://localhost:3000/api/products")

  return {
    props:{
      pizzaList:data
    }
  }
}