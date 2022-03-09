import mongoose, { Schema } from "mongoose";
import Comment from "../interfaces/comment";

const commentSchema: Schema = new Schema({
    boardId: { type:mongoose.Schema.Types.ObjectId, ref: 'Board' ,required: true },
    pw :  { type: Number, required: true },
    createdAt:{type:Date, default:Date.now},
    Comment: { type: String, required: true }
}, {
    versionKey: false, //__v 필드 제거
})

export default mongoose.model<Comment>("Comment", commentSchema);