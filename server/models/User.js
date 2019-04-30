import mongoose from "mongoose"; // Helper for communicating with Mongodb.
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  age: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  }
});
export default mongoose.model("User", UserSchema);
