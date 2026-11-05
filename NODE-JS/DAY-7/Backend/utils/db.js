import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});
const TodoSchema = new Schema({
  UserId: ObjectId,
  Todo_name: String,
  isDone: Boolean,
});

export const UserModel = mongoose.model("User", UserSchema);
export const TodoModel = mongoose.model("Todo", TodoSchema);
