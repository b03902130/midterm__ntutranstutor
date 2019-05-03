const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const TeacherSchema = new Schema({
    googleid: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'name field is required.']
    },
    departmentid: {
        type: String,
        required: [true, 'department field is required.']
    },
    imgurl: {
        type: String,
        required: [true, 'imgurl field is required.']
    },
    description: {
        type: String,
        required: [true, 'description field is required.']
    },
})

// Creating a table within database with the defined schema
const Teacher = mongoose.model('teacher', TeacherSchema)

// Exporting table for querying and mutating
module.exports = Teacher
