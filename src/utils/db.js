import mongoose from "mongoose"
import cartManager from '../management/cartManager.js'
import productManagar from '../ProductManager.js'
import cartModel from "../dao/models/cart.model.js"
// import messageModel from "../dao/models/message.model.js"
import productModel from  "../dao/models/product.model.js"

const listCarts = cartManager.getProducts()
const listProducts = productManagar.getProducts()

mongoose.set('strictQuery', false)

await mongoose.connect ('mongodb+srv://coder:coder@cluster0.fcu8pnb.mongodb.net/ecommerce', {
    serverSelectionTimeoutMS:1000
})

console.log('BD conectada')

// for (const products of listProducts) {
//     await productModel.create(products)
// }

// for (const carts of listCarts) {
//     await cartModel.create(carts)
    
// }
// console.log('Documentos creados!')





