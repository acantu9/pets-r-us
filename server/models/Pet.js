const { Schema } = require('mongoose');

const petSchema = new Schema({
    type: {
        type: String,
    },
    size: {
        type: String,
    },
    breed: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    },
    spay: {
        type: String,
    },
    petId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});

module.exports = petSchema;