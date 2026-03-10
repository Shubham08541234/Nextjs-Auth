import mongoose from "mongoose";

export default async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;


        connection.on('connected', () => {
            console.log("MongoDb connected successfully");
        })

        connection.on('error', (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running ", err);
            process.exit();
        })
    } catch (error: any) {
        console.log("Something Went Wrong!");
        console.log("Connection Error: ", error.message);
    }
}