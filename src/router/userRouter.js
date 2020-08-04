const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride')
const User = require("../models/User")
router.post('/userRating', async (req,res) => {

    const ride = await Ride.findById(req.body.rideId);

    if(ride.bookedBy){
        return res.send({
            error : "The ride is already rated",
            success : false
        })
    }

    const customer = await User.findOne({
        userName : req.body.userName
    })

    if(!customer){
        return res.send({
            error : "No such customer",
            success : false
        })
    }

    ride.bookedBy=customer
    ride.customerRating = req.body.rating

    try{
        ride.save();
    }catch(err){
        return res.send({
            error : err,
            success : false
        })
    }   

    const avgRating=customer.avgRating;
    const newRating=(customer.rideHistory.length*avgRating+req.body.rating)/(customer.rideHistory.length+1)

    customer.rideHistory.push(ride);
    customer.avgRating=newRating;

    try{
        customer.save();
    }catch(err){
        return res.send({
            error : err,
            success : false
        })
    }
    

    res.send({
        reponse : "Thank You for Rating",
        success : true
    })
})

router.get('/userRating',async(req,res) => {

    const customer =await User.findOne({
        userName : req.body.userName
    })

    res.send({
        rating : customer.avgRating
    })
})

module.exports = router