const mongoose = require('mongoose');
//const { userSchema, User } = require('./user');
const { Schema } = mongoose;


const entrySchema = new Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
	userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    location: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    },
    temperature: {
        type: Number,
        required: false,
    },
    pH: {
        type: Number,
        required: false,
    },
    conductivity: {
        type: Number,
        required: false,
    },
    chlorine: {
        type: Number,
        required: false,
    },
    sulphate: {
        type: Number,
        required: false,
    },
    microbe: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    remark: {
        type: String,
        required: false
    }
}, {timestamps: true})

const Entry = mongoose.model('Entry', entrySchema)
module.exports = Entry;

