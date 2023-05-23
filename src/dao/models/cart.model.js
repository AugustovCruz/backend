import mongoose from "mongoose"
const cartCollection = 'carts'

const cartSchema = mongoose.Schema({
    id: Number,
    products: [{
        pid:Number,
        quantity:Number
    }]
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel