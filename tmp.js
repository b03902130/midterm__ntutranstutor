let object = {
    a: (docs, data) => {
        console.log(data);
    },
    b: function(docs, data) {
        docs.forEach(doc => {
            console.log(data);
        });
    }
}

object.b([1, 2, 3, 4, 5], 6);
process.exit();