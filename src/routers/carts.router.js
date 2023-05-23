import { Router } from 'express'
import cartManager from '../management/cartManager.js'
import cartModel from '../dao/models/cart.model.js'
const router= Router()

//test
// router.post('/test', async (req, res)=>{
//     const body = {id:1, products:[ {pid:1, quantity:8} ]}
//     const cart = new cartModel(body)
//     await cart.save()
//     res.status(201).send(cart)
// })

//Creo una Cart con product y un array

router.post('/', async (req, res)=>{
    const newCart = { products:[]}
    const newCartGenerated = new cartModel(newCart)
    await newCartGenerated.save()
    res.status(201).send("Nueva cart creada")
})
//Retorno la cart con el cid indicado
router.get('/:cid', async (req,res)=>{
    const id= parseInt(req.params.cid)
    const list = await cartModel.findOne({ id }).lean().exec()
    console.log(list)
    if(!list){
        res.send(`La cart ${cid} no existe`)
    }else{
        res.send(list)
    }
})
//Agrego y/o sumo el quantity del product Cart ingresado con los cid y pid
router.post('/:cid/products/:pid', async (req, res)=>{
    const id= parseInt(req.params.cid)
    const pid=parseInt(req.params.pid)
    cartManager.addProductCart(cid,pid)
    // const listCarts = await cartModel.findOne({id}).lean().exec()
    // if (!listCarts) {
    //     let productAdd = {'pid':pid, 'quiantity'}
    // }
    
    res.status(201).send(`producto ${pid} añadido al carrito ${cid}`)

})
export default router

