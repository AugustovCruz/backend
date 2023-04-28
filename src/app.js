// const express = require ('express')
import express from 'express' // ES MODULES
// const manager = require ('./ProductManager.js')
import productManager from './ProductManager.js'

import productos from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'



const app = express()

app.use(express.json())
app.use('/api/productos', productos )
app.use('/api/carts', cartRouter)


app.listen (8080, () => console.log('Server up') )