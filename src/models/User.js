const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type : String,
        require : true,
        unique : true
    },
    rideHistory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Ride',
            default : []
        }
    ],
    avgRating : {
        type : Number,
        default : 0
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;