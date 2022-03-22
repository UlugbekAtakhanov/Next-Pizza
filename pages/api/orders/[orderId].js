import dbConnect from "../../../util/mongo"
import Order from "../../../models/Order"


export default async function handler(req, res) {

    dbConnect()

    const {method, query} = req
    const {orderId} = query

    if (method === "GET") {
        try {
            const product = await Order?.findById({_id: orderId})
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}