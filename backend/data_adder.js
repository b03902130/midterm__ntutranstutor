// Connect to mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://b03902130:leo19941227@webprog2019-ikmvq.mongodb.net/midterm?retryWrites=true', {
    useNewUrlParser: true
});
db = mongoose.connection;
db.on('error', error => {
    console.log(error)
});

// mongoose schema
var Teacher = require('../models/teacher');