// Connect to mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://b03902130:leo19941227@webprog2019-ikmvq.mongodb.net/midterm?retryWrites=true', {
    useNewUrlParser: true
});
db = mongoose.connection;
db.on('error', error => {
    console.log(error)
});

async function dealDriver(drivers) {
    for (let i = 0; i < drivers.length; i++) {
        let { Model, entries } = drivers[i];
        for (let j = 0; j < entries.length; j++) {
            let document = new Model(entries[j]);
            await document.save().catch(console.log);
        }
        console.log("done");
        process.exit();
    }
}


var fs = require('fs');
fs.readdir("./insertDriver/", (err, items) => {
    if (err) {
        console.log(err);
    }
    else {
        let drivers = items.map(item => require(`./insertDriver/${item}`));
        dealDriver(drivers);
    }
})



