const { Schema, model } = require("mongoose");

// Creating Comment schema
const CommentSchema = new Schema({

})

const Comment = model("Comment", CommentSchema);

module.exports = Comment;