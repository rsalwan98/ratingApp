const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    userName : {
        type : String,
        unique : true,
        require : true
    },
    ridesDriven : [{ 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ride',
        default : []
    }],
    avgRating : {
        type : Number,
        default : 0
    }
})

const Driver = mongoose.model('Driver',driverSchema);
module.exports = Driver;