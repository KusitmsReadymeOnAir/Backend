import mongoose, { Schema } from "mongoose";
import Comment from "../interfaces/comment";

const commentSchema: Schema = new Schema({
    boardId: { type:mongoose.Schema.Types.ObjectId, ref: 'Board' ,required: true },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pw :  { type: Number, required: true },
    createdAt:{type:Date, default:Date.now},
    Comment: { type: String, required: true },
    parentComment: { // 1
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
      isDeleted: { // 2
        type: Boolean,
        default: false,
      },
}, {
    versionKey: false, //__v 필드 제거
    toObject: { virtuals: true },
    toJSON: { virtuals: true }//가상 데이터 보내라
});

// commentSchema.virtual('comments', {
//     ref: 'Comment',
//     localField: '_id',
//     foreignField: 'parentComment',
//   });//코멘트

export default mongoose.model<Comment>("Comment", commentSchema);