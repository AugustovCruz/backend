class TicketManager {
    constructor(){
        this.events = [];
    }
    
    generateID = () => {
        if (this.events.length === 0) return 1
        return this.events[this.events.length-1].id + 1
    }

    getProducts = () => {
        return this.events
    }

    getProductById = (productId) => {    
        return this.events.find((events) => events.id === productId)
    }

    addProduct = (title, description, price, thumbnail , code, stock) => {
        const id = this.generateID()
        const product = {id, title, description, price, thumbnail , code, stock}
        // Validacion de campos que sean obligatorios
        if (!title  || !description || !price || !thumbnail || !code || !stock ) {
            return console.log ('Faltan datos')
        }
        // Validacion para que no se repita el codigo
        const index = this.events.findIndex((p) => p.code === code);
        if (index !== -1) {
        return console.log("Error, hay un codigo repetido");
        }
        this.events.push(product)
    }
}

const manager= new TicketManager();
manager.addProduct('oreo', 'galleta', 200, 'img', 00001, 100)
manager.addProduct('ore', 'gallet', 100, 'mg', 0001, 10)
manager.addProduct('oreou', 'galle', 40, 'i', 00003, 50)
manager.addProduct('oreo4', 'gall', 40, 'img', 00004, 20)

console.log(manager.events)
console.log (manager.getProductById(2))