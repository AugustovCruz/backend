// const express = require ('express')
import express from 'express' // ES MODULES
//Hago el llamado para la conexion a Mongo ATLAS
import './utils/db.js'
// const manager = require ('./ProductManager.js')
import productManager from './ProductManager.js'
import messagesModel from './dao/models/message.model.js'

import productos from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'
import handlebars from 'express-handlebars'
import onlineProducts from './routers/onlineProducts.js'
import chat from './routers/chat.router.js'
import { Server } from 'socket.io'

const app = express()

// Inicialización de Socket.io
const httpServer = app.listen(8080, () => console.log('Server up'))
const io = new Server(httpServer)

// Configuración de Express
app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use(express.static('./src/public'))

// Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

// Rutas
app.use('/api/productos', productos)
app.use('/api/carts', cartRouter)
app.use('/', onlineProducts)
app.use('/chat', chat)
// app.use('/', (req, res) => res.send('Todo ok!'))

// Conexión con Socket.io
let messages = []
io.on('connection', async  (socket) => {
    console.log('Usuario conectado1');
    socket.emit('products', await productManager.getProducts());
  
    socket.on('newProduct', async (product) => {
      productManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock )
      socket.emit('products', await productManager.getProducts());
    });

    io.emit('logs', messagesModel.find().lean().exec())
    socket.broadcast.emit('newUser')
    socket.on('message', async (data) => {
        messages.push(data)
        const messagesGenerated = new messagesModel(data)
        await messagesGenerated.save()
        console.log(data)
        io.emit('logs', messages)   //emite a todos los clientes conectados
        // socket.emit('logs', messages)   //emite solo al cliente quien envió data
    })


  });

