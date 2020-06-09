const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
   },
   username: {
      type: String,
      unique: true,
   },
   profilepic: {
      type: String,
      default:
         "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Person", PersonSchema);
