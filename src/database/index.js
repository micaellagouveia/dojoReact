import mongoose from 'mongoose'
class Database {
    constructor() {
        this.init();
    }

    async init() {
        try {
            await mongoose.connect(process.env.URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('conectado')

        }catch(erro){
            console.log(erro)
        }
    }

}

export default new Database()