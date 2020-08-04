const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride')
const Driver = require('../models/Driver');

router.post('/driverRating' , async (req,res) => {
    const ride = await Ride.findById(req.body.rideId);

    if(ride.drivenBy){
        return res.send({
            error : "The ride is already rated",
            success : false
        })
    }

    const driver = await Driver.findOne({
        userName : req.body.userName
    })

    if(!driver){
        return res.send({
            error : "No such Driver",
            success : false
        })
    }

    ride.drivenBy = driver;
    ride.driverRating = req.body.rating;

    try{
        ride.save();
    }catch(err){
        return res.send({
            error : err,
            success : false
        })
    }  

    const avgRating=driver.avgRating;
    const newRating=(driver.ridesDriven.length*avgRating+req.body.rating)/(driver.ridesDriven.length+1)

    driver.ridesDriven.push(ride);
    driver.avgRating=newRating;

    try{
        driver.save();
    }catch(err){
        return res.send({
            error : err,
            success : false
        })
    }

    res.send({
        response : "Than You for rating",
        success : true
    })
})

router.get('/driverRating', async (req,res) => {

    const driver = await Driver.findOne({
        userName : req.body.userName
    });

    res.send({
        rating : driver.avgRating
    })
})

module.exports = router;