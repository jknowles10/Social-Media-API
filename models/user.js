const { Schema, model } = require('mongoose');
const thought = require('./thought');

userSchema = new Schema (
 {
    username: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true,
    },
    email: {
        type: String, 
        unique: true, 
        required: true, 
    }, 
    thoughts: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'user',
        },
    ],
 },
 {
    to:JSON: {
        virtuals: true, 
    },
    id: false, 
    versionKey: false, 
 }   
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const user = model('user', userSchema);

modeule.exports = user; 