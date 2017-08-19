var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    created: { type: Date, required: true },
    votes: { type: Object, required: true },
    totalVotes: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    comments: { type: Array, required: true },

    //RELATIONSHIPS
    userId: { type: ObjectId, ref: "User", required: true },
})


// rough comment blueprint{
//     text: "great post",
//     user: "dkjfskjdf;ilsjdf930",
//     timestamp: 291992838290321802


module.exports = mongoose.model("Post", postSchema);