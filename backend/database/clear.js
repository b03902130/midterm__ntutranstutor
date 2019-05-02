var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://b03902130:leo19941227@webprog2019-ikmvq.mongodb.net/midterm?retryWrites=true', {
    useNewUrlParser: true
});
db = mongoose.connection;
db.on('error', error => {
    console.log(error)
});

async function dealDriver(drivers) {
    for(let i=0; i<drivers.length; i++) {
        await drivers[i].deleteMany().catch(console.log);
    }
    console.log("done");
    process.exit();
}

var drivers = require("./clearDriver/clearModels");
dealDriver(drivers);
