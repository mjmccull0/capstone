/**
 * This is the schema for the comments that will appear under posts.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: String,
    dateCreated: Date,
    dateEdited: Date,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    isActive: Boolean // In lieu of permanently deleting the Comment.
});

// Allows the Comment Schema to be used outside of this file.
module.exports = mongoose.model("Comment", commentSchema);