import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try {
       const con = await mongoose.connect(process.env.MONGO_URL)

         console.log(`✅ MongoDB Connected: ${con.connection.host}`);
        //  console.log(`📌 Database Name: ${con.connection.name}`);
        // console.log(`🌐 Port: ${con.connection.port}`);
        
    } catch (error) {
        console.log(`Error In Connection ${con.connection.error}`);
        process.exit(1);
        
    }

}

export default ConnectDB;