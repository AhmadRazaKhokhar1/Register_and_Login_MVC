const {connect} = require('http2');
const {MongoClient, ServerApiVersion} = require('mongodb');
const mongoose = require('mongoose');
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

module.exports = userClient;