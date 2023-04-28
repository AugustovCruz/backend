import { Router } from 'express'
import manager from '../ProductManager.js'

const router = Router()

router.get ('/:id', (req, res) => {
    const id = req.params.id
    const result = manager.getProducts().find(item => item.id == id)
    if (!result) return res.send({
        code: 404,
        message: 'El producto indicado no existe'
    })
    // console.log(result)
    res.send(result )
} )

router.get ('', (req, res) => {
    const limit = req.query.limit
    const delimitation = manager.getProducts().slice(0, limit)
    res.send(delimitation)
})

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
router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const productBody = req.body;
    const numFields = Object.keys(productBody).length
    if (numFields == 6 ) {
        manager.updateParams(productId, productBody)
        res.send(`Product with ID ${productId} has been updated`)
    } else res.send('Solo es valido actualizar con 6 campos ingresados. Denied: category and status ')
});

router.delete ('/:pid', (req, res) => {
    const id = req.params.pid
    if (manager.getProductById(+id)) {
        manager.deleteProduct(+id)
        res.send('producto eliminado')
    } else return res.send(`producto con el ID: ${id} not found`)  
})

export default router