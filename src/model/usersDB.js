import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, minlength: 8, required: true },
  
});

const user_model = mongoose.model("management", userSchema);

export default user_model;