import mongoose, { Schema, model } from "mongoose";

interface IUser {
  name: string;
  age: number;
  rank: number;
  category: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  rank: { type: Number, required: true },
  category: { type: String, required: true },
});

const UserModel = model<IUser>("TUser", userSchema);

async function query() {
  const start = Date.now();
  const data = await UserModel.count();
  console.log(data) // 245224
}

mongoose.connect("mongodb://47.112.180.188:27017").then(() => {
  query();
});