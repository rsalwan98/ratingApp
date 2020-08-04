const mongoose = require('mongoose');

const rideSchema = mongoose.Schema({
    
    drivenBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Driver',
        default : null
    },
    bookedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    },
    driverRating :{
        type : Number,
        default : 0
    },
    customerRating : {
        type : Number,
        default : 0
    }
})

const Ride = mongoose.model('Ride',rideSchema);
module.exports = Ride;