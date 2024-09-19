const { Schema, model } = require('mongoose');
const reaction = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            minLength: 1, 
            maxLength: 280, 
            required: true, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        }, 
        username: {
            type: String, 
            required: true, 
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            getters: true,
            virtual: true, 
        }, 
        id: false, 
        versionKey: false, 
    }
)

function formatDate(date) {
    let formattedDate = date.toLocaleString();
    return formattedDate;

}

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;

});

const thought = model('thought', thoughtSchema);
modeule.exports = thought;

