const crypto = require ('crypto')

const DB = []

class UserManager {

    getUsers = () => {
        return DB
    }

    insertUser  = (user) => {
        //Agregar user al DB
        user.salt = crypto.randomBytes(128).toString('base64')
        user.pass = crypto.createHmac('sha256', user.salt).update(user.pass).digest('hex')
        DB.push(user)
        return user 
        }

    valideUser = (username, pass) => {
        const user = DB.find(item => item.username == username)
        if (!user) {
            console.log('User not found')
            return
        }

        const newHash = crypto.createHmac('sha256', user.salt).update(pass).digest('hex')
        if(newHash === user.pass) console.log('Logged!')
        else console.log('Invalid pass')
    } 
}
const user = new UserManager()
user.insertUser( {name: 'Tito', lastname: 'Fuentes', username: 'tito29', pass: 'c0d3r'})

console.log (DB)
user.valideUser('alexmarinmendez', 'c0d3r')
user.valideUser('tito', 'c0d3r')
user.valideUser('tito29', 'c0d3r')