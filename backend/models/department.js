const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required.']
    }
})

// Creating a table within database with the defined schema
const Department = mongoose.model('department', DepartmentSchema)

// Exporting table for querying and mutating
module.exports = Department
