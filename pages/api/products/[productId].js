


import dbConnect from "../../../util/mongo"
import Product from "../../../models/Product"

export default async function handler(req, res) {

    const {method, query} = req
    const {productId}  = query

    dbConnect()

    if (method === "GET") {
        try {
            const product = await Product.findById(productId)
            console.log(product)
            res.status(200).json(product)
        } catch (error) {
            console.log(error)
            res.status(200).json(error)
        }
    }

    if (method === "DELETE") {
        try {
            const product = await Product?.findByIdAndDelete(productId)
            res.status(200).json(product)
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}
