import { model, Schema } from "mongoose";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
    },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

const User = model(collection, schema);

export default User;
