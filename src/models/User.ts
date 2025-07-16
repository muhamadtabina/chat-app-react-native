import { Schema, Document, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

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

interface Methods {
  comparePassword(inputPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    email: {
      required: [true, "Email required"],
      type: String,
      unique: [true, "Email already registered"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
    },
    name: {
      required: [true, "Username required"],
      type: String,
      unique: [true, "Username already registered"],
    },
    password: {
      required: [true, "Password required"],
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

userSchema.methods.comparePassword = async function (inputPassword) {
  return await compare(inputPassword, this.password);
};

const User = model("User", userSchema);

export default User;
