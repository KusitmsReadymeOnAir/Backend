import { Document } from "mongoose";
import { ObjectId } from "aws-sdk/clients/codecommit";

export default interface Comment extends Document {
    boardId: ObjectId,
    pw : Number, 
    createdAt:Date,
    Comment: String,
    parentComment: ObjectId,
    isDeleted:Boolean,
    userId:String
}