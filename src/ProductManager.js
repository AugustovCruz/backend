import fs from 'fs' // ES MODULES
const filename = './src/data/datos.txt'
class TicketManager {

    constructor() {
        this.products = []; 
    }

    generateID = (productos) => {
        if (productos.length === 0) return 1
        return productos[productos.length-1].id + 1
    }
    //Se obtiene la lista de productos leyendo el archivo
    getProducts = () => {
        if( fs.existsSync(filename)){
            const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'))
            return contenido
        } 
        return []
    }
    // Se obtiene el producto a traves del ID
    getProductById = (productId) => {    
        const productos= this.getProducts()
        const producto = productos.find((events) => events.id=== productId)
        if (producto) return producto
        return console.log('Error: Producto no encontrado en los archivos')
    }
    // Agrego productos y genero un ID automatico
    addProduct  = async (title, description, price, thumbnail , code, stock) => {
        const productos= this.getProducts()
        const id = this.generateID(productos)
        const product = {id, title, description, price, thumbnail , code, stock}
        // Validacion de campos que sean obligatorios
        if (!title  || !description || !price || !thumbnail || !code || !stock ) {
            return console.log ('Faltan datos')
        }
        
        // Validacion para que no se repita el Codigo
        const index = productos.findIndex((p) => p.code === code);
        if (index !== -1) {
            return console.log("Error, hay un codigo repetido");
        }
        productos.push(product)
        await fs.writeFileSync(filename, JSON.stringify(productos, null, '\t'))
    }
    //Actualizo valores de un producto del campo segun la key ingresada
    updateProduct = (id, key, value ) => {
        const productos = this.getProducts()
        
        let item = productos.find( el => (el.id === id))
        if (item && item.hasOwnProperty(key)){
            item[key]= value
            fs.writeFileSync(filename, JSON.stringify(productos, null,'\t' ))
        } else console.log('No se encontraron los datos para actualizar')
    }
    // Actualizo y creo el producto con los campos nuevos ingresados
    addUpdateProduct  = async (title, description, price, thumbnail , code, stock, status, category) => {
        const productos= this.getProducts()
        const id = this.generateID(productos)
        const product = {id, title, description, price, thumbnail , code, stock, status, category}
        // Validacion de campos que sean obligatorios
        if (!title  || !description || !price || !thumbnail || !code || !stock || !status || !category) {
            return console.log ('Faltan datos')
        }
        // Validacion para que no se repita el Codigo
        const index = productos.findIndex((p) => p.code === code);
        if (index !== -1) {
            return console.log("Error, hay un codigo repetido");
        }
        
        productos.push(product)
        await fs.writeFileSync(filename, JSON.stringify(productos, null, '\t'))
    }
    //Actualizo los productos desde el req.body

    updateParams = (id, productoBody) => {
        let productosTotal = this.getProducts()
        const product = productosTotal.find(el => el.id === id)
        if (product) {
            Object.assign(product, productoBody)
            fs.writeFileSync(filename, JSON.stringify(productosTotal, null, '\t'))
            console.log(`Producto actualizado: ${JSON.stringify(product)}`)
        } else {
            console.log(`No se encontró ningún producto con el ID: ${id}`)
        }
    }

    // Se elimina el producto segun el ID ingresado
    deleteProduct = async (id) => {
        const productos= this.getProducts()
        const productoIndex = productos.findIndex( (item) => item.id === id )
        if (productoIndex === -1) return console.log('Error: No existe ningun elemento con ese ID')
        productos.splice(productoIndex, 1)
        await fs.writeFileSync(filename, JSON.stringify(productos, null, '\t'))
    }
        
}

const manager= new TicketManager();
export default manager

// module.exports = manager
// console.log(manager.getProducts())
// manager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
// console.log(manager.getProducts())
// manager.getProductById(1)
// manager.updateProduct(1, 'stock', 1000)
// manager.addProduct('ore', 'gallet', 100, 'mg', 2, 10)
// manager.deleteProduct(1)
// manager.addProduct('producto prueba1', 'Este es un producto prueba1', 200, 'Sin imagen1', 'abc1', 25)
// manager.addProduct('producto prueba2', 'Este es un producto prueba2', 201, 'Sin imagen2', 'abc2', 30)
// manager.addProduct('producto prueba3', 'Este es un producto prueba3', 202, 'Sin imagen3', 'abc3', 35)
// manager.addProduct('producto prueba4', 'Este es un producto prueba4', 203, 'Sin imagen4', 'abc4', 45)
// manager.addProduct('producto prueba5', 'Este es un producto prueba5', 204, 'Sin imagen5', 'abc5', 55)
// manager.addProduct('producto prueba6', 'Este es un producto prueba6', 205, 'Sin imagen6', 'abc6', 65)
// manager.addProduct('producto prueba7', 'Este es un producto prueba7', 206, 'Sin imagen7', 'abc7', 75)
// manager.addProduct('producto prueba8', 'Este es un producto prueba8', 207, 'Sin imagen8', 'abc8', 85)
// manager.addProduct('producto prueba9', 'Este es un producto prueba9', 208, 'Sin imagen9', 'abc9', 95)
// manager.addProduct('producto prueba10', 'Este es un producto prueba10', 209, 'Sin imagen10', 'abc10', 15)