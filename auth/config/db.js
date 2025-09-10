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
            console.log(`Failed to connect with mongodb: ${error}`)
        }
    }
}

export default db