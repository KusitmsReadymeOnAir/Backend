import { Document } from "mongoose";

export default interface User extends Document {
    googleId: String,
    name : String,
    email : String
}