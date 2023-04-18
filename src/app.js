const express = require ('express')
const app = express()
const manager = require ('./ProductManager.js')
app.use(express.json())

app.get ('/', (req, res) => {
    res.send ( manager.getProducts() )
})

app.get ('/productos/:id', (req, res) => {
    const id = req.params.id
    const result = manager.getProducts().find(item => item.id == id)
    if (!result) return res.send({
        code: 404,
        message: 'El producto indicado no existe'
    })
    // console.log(result)
    res.send(result )
} )

app.get ('/productos', (req, res) => {
    const limit = req.query.limit
    const delimitation = manager.getProducts().slice(0, limit)
    res.send(delimitation)
})

app.listen (8080, () => console.log('Server up') )