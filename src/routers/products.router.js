import { Router } from 'express'
import manager from '../ProductManager.js'
import productModel from '../dao/models/product.model.js'

const router = Router()

router.get ('/', async (req, res) => {
    const limit = req.query.limit
    const delimitation = await manager.getProducts()
    const limitedResults = delimitation.slice(0, limit)
    res.send(limitedResults)
})

router.get ('/:id', async (req, res) => {
    const id = req.params.id
    const productos = await manager.getProducts()
    const result = await productos.find(item => item.id == id)
    if (!result) return res.send({
        code: 404,
        message: 'El producto indicado no existe'
    })
    // console.log(result)
    res.send(result )
} )

//agregar un nuevo producto con los campos vistos y ademas con status:boolean, category: string y un array de thumbnails
router.post ('/',(req, res) => {
    const product = req.body
    const numFields = Object.keys(product).length 
    if ( numFields==8 && product.status == true) {
        manager.addUpdateProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.status, product.category)
        res.send ('Producto añadido')
    } else res.send ('Se necesita un status:true para añadir el producto, como tambien 8 campos ingresados: category & status')
})
// Metodo para Actualizar por el req.body
router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const productBody = req.body;
    try {
        await productModel.updateOne({ id }, { ...productBody })
        res.sendStatus(200)
    } catch(err) {
        console.log('error.....')
        res.send({err})
    }
})

router.delete ('/:pid', async (req, res) => {
    const id = req.params.pid
    // if (manager.getProductById(+id)) {
    //     manager.deleteProduct(+id)
    //     res.send('producto eliminado')
    // } else return res.send(`producto con el ID: ${id} not found`)  
    try {
        await productModel.deleteOne({ id })
        res.send(`Producto ${id} borrado exitosamente!`)
    } catch (err) {
        res.send({err})
    }
})

export default router