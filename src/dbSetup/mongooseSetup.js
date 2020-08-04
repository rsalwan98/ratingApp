const mongoose = require('mongoose');
const url = 'mongodb+srv://rsalwan:dbpassword@cluster0.zwxla.mongodb.net/ratingSystem?retryWrites=true&w=majority';

mongoose.connect(url,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
})