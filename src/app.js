// const express = require ('express')
import express from 'express' // ES MODULES
// const manager = require ('./ProductManager.js')
// import productManager from './ProductManager.js'
import manager from './ProductManager.js'
import productos from './routers/products.router.js'


const app = express()

app.use(express.json())
app.use('/productos', productos)


app.get ('/', (req, res) => {
    res.send ( manager.getProducts() )
})

app.listen (8080, () => console.log('Server up') )