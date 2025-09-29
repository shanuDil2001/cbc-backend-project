import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   fname: {
      type: String,
      required: true
   },
   lname: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      required: true,
      default: "customer"
   },
   isBlocked: {
      type: Boolean,
      required: true,
      default: false
   },
   img: {
      type: String,
      required: true,
      default: "https://avatar.iran.liara.run/public/25"
   }
});

const User = mongoose.model("users", userSchema);

export default User;