const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const WhitelistSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email field is required.']
	},
	facebook: {
		type: String,
		required: [true, 'Facebook field is required.']
	},
})

// Creating a table within database with the defined schema
const Whitelist = mongoose.model('whitelist', WhitelistSchema)

// Exporting table for querying and mutating
module.exports = Whitelist
