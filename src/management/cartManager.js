import fs from 'fs'
const filename = '../data/carts.txt'

class ProductoCart {

    constructor(product_id, quantity) {
        this.product_id = product_id;
        this.quantity = quantity;
    }
    generateID = (productos) => {
        if (productos.length === 0) return 1
        return productos[productos.length-1].id + 1
    }
    getProducts = () => {
        if( fs.existsSync(filename)){
            const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'))
            return contenido
        } 
        return []
    }
    addProduct  = async (quantity) => {
        let productos= this.getProducts()
        const id = this.generateID(productos)
        const product = {id, quantity}
        if (!quantity ) {
            return console.log ('Faltan datos')
        }
        if (index !== -1) {
            return console.log("Error, hay un codigo repetido");
        }
        productos.push(product)
        await fs.writeFileSync(filename, JSON.stringify(productos, null, '\t'))
    }

}
const managerCart= new ProductoCart();
export default managerCart
managerCart.addProduct('cartproduct1')


// class ObjetosCarts {
//     constructor(id, productos) {
//         this.id = id;
//         this.productos = productos;
//     }
//     getProducts = () => {
//         if( fs.existsSync(filename)){
//             const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'))
//             return contenido
//         } 
//         return []
//     }
//     generateID = (productos) => {
//         if (productos.length === 0) return 1
//         return productos[productos.length-1].id + 1
//     }
//     addProduct  = async (managerCart.getProducts()) => {
//         const productos= this.getProducts()
//         const id = this.generateID(productos)
//         const product = {id, managerCart.getProducts()}

//         productos.push(product)
//         await fs.writeFileSync(filename, JSON.stringify(productos, null, '\t'))
//     }

// }
