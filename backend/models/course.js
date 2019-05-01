const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const CourseSchema = new Schema({
    teacherid: {
        type: String,
        required: [true, 'teacherid field is required.']
    },
    subjectid: {
        type: String,
        required: [true, 'subjectid field is required.']
    },
    price: {
        type: String,
        required: [true, 'price field is required.']
    },
    description: {
        type: String,
        required: [true, 'description field is required.']
    }
})

// Creating a table within database with the defined schema
const Course = mongoose.model('course', CourseSchema)

// Exporting table for querying and mutating
module.exports = Course
