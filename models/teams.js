const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    imageUrl: {
        type: String,
        required: false
    },

    members: [
        {
            name: {type: String, unique: true, required: false},
            phone: {type: String, unique: true, required: false},
            email: {
                type: String,
                unique: true,
                required: false,
                trim: true,
                lowercase: true
              }
        }
    ],
}, {timestamps: true})

const Team = mongoose.model('Team', teamSchema)
module.exports = Team