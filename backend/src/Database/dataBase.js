import {MongoClient, ServerApiVersion} from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const uri = process.env.MONGO_URI_TEST;

const userClient = new MongoClient(uri, {
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
})

function run(){
    mongoose.connect(uri);
    console.log(`Connected to Data Base! 🔥`);
}
run()

export default userClient;