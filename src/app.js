const express = require('express');
const app = express();
const userRouter = require('./router/userRouter')
const driverRouter = require('./router/driverRouter')

require('./dbSetup/mongooseSetup')

app.use(express.json());
app.use(userRouter);
app.use(driverRouter)

app.listen(3000,() => {
    console.log("Server is Up!!")
}) 