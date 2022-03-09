import { Document } from "mongoose";

export default interface Comment extends Document {
    boardId: Number,
    pw : Number, 
    createdAt:Date,
    Comment: String
}