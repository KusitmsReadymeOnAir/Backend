import { Document } from "mongoose";

export default interface Counter extends Document {
    name: String,
    count : Number
}