

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const weddingtodoSchema = mongoose.Schema({
    title: {type: String, required: true },
    description: {type: String, required: true},
    actionby: {type: String, required: true},
    dueByDate: {type: Date, required: true},
    status: {type: String, required: true},
    option:{type :String, required: true},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
});

module.exports = mongoose.model("Weddingtodo", weddingtodoSchema);
