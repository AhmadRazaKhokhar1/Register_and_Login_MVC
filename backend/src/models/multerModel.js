const mongoose = require('mongoose')

const uri = process.env.MONGO_URI_TEST;
mongoose.connect(uri);

const fileSchema = new mongoose.Schema({
    name:String,
    data:Buffer,
});

const fileModel = mongoose.model('File', fileSchema);

module.exports = fileModel;