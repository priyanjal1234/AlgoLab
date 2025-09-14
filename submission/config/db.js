import mongoose from "mongoose";

async function db() {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to ${conn.connection.host}`)
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message)
        }
        else {
            console.log(`Error in connecting with mongodb: ${error}`)
        }
    }
}

export default db