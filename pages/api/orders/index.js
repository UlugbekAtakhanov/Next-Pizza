import dbConnect from "../../../util/mongo"
import Order from "../../../models/Order"

export default async function handler(req, res) {

    dbConnect()

    const {method} = req

    if (method === "GET") {
        try {
            const orders = await Order?.find()
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if (method === "POST") {
        try {
            const orders = await Order?.create(req.body)
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
