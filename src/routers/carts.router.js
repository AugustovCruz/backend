import { Router } from 'express'
import cartManager from '../management/cartManager.js'

const router= Router()

//Creo una Cart con product y un array
router.post('/', (req, res)=>{
    cartManager.addCart()
    res.status(201).send("Nueva cart creada")
})
//Retorno la cart con el cid indicado
router.get('/:cid', (req,res)=>{
    const cid= parseInt(req.params.cid)
    const list = cartManager.getProductById(cid)
    if(!list){
        res.send(`La cart ${cid} no existe`)
    }else{
        res.send(list)
    }
})
//Agrego y/o sumo el quantity del product Cart ingresado con los cid y pid
router.post('/:cid/products/:pid', (req, res)=>{
    const cid= parseInt(req.params.cid)
    const pid=parseInt(req.params.pid)
    cartManager.addProductCart(cid,pid)
    res.status(201).send(`producto ${pid} añadido al carrito ${cid}`)

})
export default router

