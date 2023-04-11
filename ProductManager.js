const fs = require ('fs')
const filename = './datos.txt'

class TicketManager {

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
        const producto = productos.find((events) => events.id === productId)
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
console.log(manager.getProducts())
manager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
console.log(manager.getProducts())
manager.getProductById(1)
manager.updateProduct(1, 'stock', 1000)
manager.addProduct('ore', 'gallet', 100, 'mg', 2, 10)
manager.deleteProduct(1)
