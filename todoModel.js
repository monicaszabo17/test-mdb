
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TodoSchema = new mongoose.Schema({
    title: {type: String, required: true , max:50},
    dueByDate: {type: Date, required: true},
    //1 hour from now -current datetime when create a new record
    //type: Date, default: () => Date.now() + 1*60*60*1000
    createdOn: {type: Date, required: true},
    //status-finished, ongoing.
    status: {type: String, required: true},
    active:{type: Boolean, required: true},
    userName:{type :String, required: true}
});

module.exports = mongoose.model("Todo", TodoSchema);


