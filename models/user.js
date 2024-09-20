const { Schema, model } = require('mongoose');
const thought = require('./Thought');

userSchema = new Schema(
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
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
 },
 {
    toJSON: {
        virtuals: true, 
    },
    id: false, 
    versionKey: false, 
 }   
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const user = model('User', userSchema);

modeule.exports = User; 