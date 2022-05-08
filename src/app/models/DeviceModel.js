const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceModel = new Schema({
    IMEI: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    longitude: {
        type: String,
        default: '',
    },
    latitude: {
        type: String,
        default: '',
    },
    modifiedDate: {
        type: Date,
        default: null,
    },
    idOwner:{
        type:mongoose.Types.ObjectId,
        ref:'owners',
        default:null
    }
});

module.exports = mongoose.model('devices',DeviceModel);