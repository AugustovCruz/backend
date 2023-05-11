import { Router } from 'express'
import manager from '../ProductManager.js'
const router = Router()

router.get('/', (req,res)=> {
    const productos = manager.getProducts()
    res.render('home', {productos})
})

router.get('/realtimeproducts', (req,res) =>{
    const productos = manager.getProducts()
    res.render('realTimeProducts', {productos})
})

export default router