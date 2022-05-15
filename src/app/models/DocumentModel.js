const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Documents = new Schema({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    content: {
        type:String,
        default:'<p></p>'
    }
},{timestamps:true});
module.exports= mongoose.model('Documents',Documents);