import { Router } from 'express'
import productModel from '../dao/models/product.model.js'
// import manager from '../ProductManager.js'
const router = Router()

router.get('/', async (req,res)=> {
    const productos = await productModel.find().lean().exec()
    res.render('home', {productos})
})

router.get('/realtimeproducts', async (req,res) =>{
    // const productos = manager.getProducts()
    // const productos =  manager.getProducts()
    const productos = await productModel.find().lean().exec()
    res.render('realTimeProducts', productos)
})

export default router