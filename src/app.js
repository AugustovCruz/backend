// const express = require ('express')
import express from 'express' // ES MODULES
// const manager = require ('./ProductManager.js')
import productManager from './ProductManager.js'

import productos from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'
import handlebars from 'express-handlebars'
import onlineProducts from './routers/onlineProducts.js'
import { Server } from 'socket.io'


const app = express()

// Inicialización de Socket.io
const httpServer = app.listen(8080, () => console.log('Server up'))
const io = new Server(httpServer)

// Configuración de Express
app.use(express.json())
app.use(express.static('./src/public'))

// Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

// Rutas
app.use('/api/productos', productos)
app.use('/api/carts', cartRouter)
app.use('/', onlineProducts)
// app.use('/', (req, res) => res.send('Todo ok!'))

// Conexión con Socket.io

io.on('connection', (socket) => {
    console.log('Usuario conectado1');
    socket.emit('products', productManager.getProducts());
  
    socket.on('newProduct', (product) => {
      productManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock )
      socket.emit('products', productManager.getProducts());
    });
  });

