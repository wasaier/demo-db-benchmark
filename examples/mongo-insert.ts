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

const mark = {
  start: 0,
  end: 0,
};

async function insert() {
  mark.start = Date.now();
  for (let i = 0; i < 10000 * 50; i++) {
    if (i > 200) {
      process.exit();
    }
    {
      const kitty = new UserModel({
        name: `name_${i}`,
        rank: i,
        category: `cate_${i % 10}`,
        age: Math.random() * 100,
      });
      await kitty.save();
      if (i % 200 === 0) {
        console.log(i);
      }
    }
  }
  mark.end = Date.now();
  console.log(mark);
}

mongoose.connect("mongodb://47.112.180.188:27017").then(() => {
  insert();
});
