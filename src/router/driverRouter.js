const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride')
const Driver = require('../models/Driver');

router.post('/driverRating' , async (req,res) => {
    try{
        const ride = await Ride.findById(req.body.rideId);
        if(!ride) {
            return res.send({
                err: 'Invalid request',
                success: false
            })
        }
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
        await ride.save();
        const avgRating=driver.avgRating;
        const newRating=(driver.ridesDriven.length*avgRating+req.body.rating)/(driver.ridesDriven.length+1)

        driver.ridesDriven.push(ride);
        driver.avgRating=newRating;
        await driver.save();
        res.send({
            response : "Than You for rating",
            success : true
        })
    }catch(err){
        return res.send({
            error : err,
            success : false
        })
    }
})

router.get('/driverRating', async (req,res) => {

    try{
        const driver = await Driver.findOne({
            userName : req.body.userName
        });   
        if(!driver) {
            return res.send({
                err: "Invalid request",
                success: false
            })
        }
        res.send({
            rating : driver.avgRating
        })
    }catch(err){
        res.send({
            rating : driver.avgRating
        })
    }
})

module.exports = router;