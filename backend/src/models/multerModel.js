const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
    },

    data:{
        type:Buffer,
    },
});

const fileModel = mongoose.model('File', fileSchema);

const uri = process.env.MONGO_URI_TEST;
mongoose.connect(uri);
mongoose.connection.on('disconnected', ()=>{
    console.log(`The connection terminated!`)
})
module.exports = fileModel;