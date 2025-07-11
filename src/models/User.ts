import { Schema, Document, model } from "mongoose";
import { genSalt, hash } from "bcrypt";

interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  token?: string;
  avatar?: {
    url: string;
    id: string;
  };
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      required: true,
      type: String,
      unique: [true, "Email already registered"],
    },
    name: {
      required: true,
      type: String,
      unique: [true, "Username already registered"],
    },
    password: {
      required: true,
      type: String,
      min: [6, "Password minimal 6 character"],
    },
    token: {
      type: String,
    },
    avatar: {
      type: Object,
      url: String,
      id: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
  next();
});

const User = model("User", userSchema);

export default User;
