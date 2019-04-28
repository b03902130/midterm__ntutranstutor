const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
    googleid: {
        type: String,
        required: [true, 'Googleid field is required.']
    },
	name: {
		type: String,
		required: [true, 'Name field is required.']
    },
    imgurl: {
		type: String,
		required: [true, 'Imgurl field is required.']
	},
})

// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)

// Exporting table for querying and mutating
module.exports = User
