
import dbConnect from "../../../util/mongo"
import Product from "../../../models/Product"

export default async function handler(req, res) {

    const {method} = req

    dbConnect()

    if (method === "GET") {
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (error) {
            console.log(error)
            res.status(200).json(error)
        }
    }

    if (method === "POST") {
        try {
            const product = await Product?.create(req.body)
            res.status(200).json(product)
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}
