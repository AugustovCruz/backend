import fs from 'fs';
const filename = './src/data/carts.txt' 

class ProductoCart {

    generateID = (productos) => {
        if (productos.length === 0) return 1;
        return productos[productos.length-1].id + 1;
    }

    getProducts = () => {
        if (fs.existsSync(filename)) {
            const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'));
            return contenido;
        } 
        return [];
    }

    getProductById = (productId) => {    
        const productos = this.getProducts();
        const producto = productos.find((product) => product.id === productId)
        if (producto) return producto
        return console.log('Error: Producto no encontrado en los archivos')
    }

    addCart = () => {
        let listProducts = this.getProducts()
        const id = this.generateID(listProducts)
        const newCart = {id, products:[]}
        console.log(listProducts)

        listProducts.push(newCart)
        fs.writeFileSync(filename, JSON.stringify(listProducts, null, '\t'))
        console.log(`Cart ${id} fue creado`)
    }

    addProductCart = async (cid, pid) => {
        let productos = this.getProducts()
        const cartIndex = productos.findIndex(cart => cart.id == cid)
        
        const productIndex = productos[cartIndex].products.findIndex(product => product.pid == pid)
        if (productIndex === -1) {
            let productAdd = {'pid': pid, 'quantity': 1}
            productos[cartIndex].products.push(productAdd)
            await fs.writeFileSync(filename, JSON.stringify(productos, null, '\t'))
            return productAdd
        } else {
            productos[cartIndex].products[productIndex].quantity++
            await fs.writeFileSync(filename, JSON.stringify(productos, null, '\t'))
            return productos[cartIndex].products[productIndex]
        }
    }

}
const cartManager = new ProductoCart();
export default cartManager;

