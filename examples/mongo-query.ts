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
  UserModel.aggregate(
    [
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
          totalAge: { $sum: '$age' }
        }
      },
      {
        $sort: {
          totalAge: -1
        }
      },
      {
        $skip: 0,
      },
      {
        $limit: 10
      },
    ],
    (_: any, data: any) => {
      console.log(Date.now()  - start);
      console.log(data);
    }
  );
}

mongoose.connect("mongodb://47.112.180.188:27017").then(() => {
  query();
});