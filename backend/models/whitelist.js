const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const WhitelistSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name field is required.']
	},
	schoolid: {
		type: String,
		required: [true, 'schoolid field is required.']
	},
	gmail: {
		type: String,
		required: [true, 'email field is required.']
	},
	facebook: {
		type: String,
		required: [true, 'facebook field is required.']
	},
})

// Creating a table within database with the defined schema
const Whitelist = mongoose.model('whitelist', WhitelistSchema)

// Exporting table for querying and mutating
module.exports = Whitelist
