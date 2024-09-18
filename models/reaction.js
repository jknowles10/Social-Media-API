const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new.Types.ObjectId(),

        },
        reactionBody: {
            type: String, 
            required: true, 
            maxLength: 280,
        },
        username: {
            type: String, 
            required: true, 
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: formatDate,
        },
    },
    {
        toJSON: {
            getters: true, 
        }, 
        id: false, 
        versionKey: false, 
    }
);

function formatDate(date) {
    let formattedDate = date.toLocaleString();
    return formattedDate;
}