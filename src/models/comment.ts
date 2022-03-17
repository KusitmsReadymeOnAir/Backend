import mongoose, { Schema } from "mongoose";
import Comment from "../interfaces/comment";

const commentSchema: Schema = new Schema({
    boardId: { type:mongoose.Schema.Types.ObjectId, ref: 'Board' ,required: true },
<<<<<<< HEAD
    userId : { type:mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
=======
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId : { type:mongoose.Schema.Types.ObjectId, ref : 'User', required : true } ,
>>>>>>> 69122b6 (게시글 작성 수정)
    createdAt:{type:Date, default:Date.now},
    comment: { type: String, required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'comment' },
    isDeleted: { type: Boolean, default: false },
}, {
    versionKey: false, //__v 필드 제거
    toObject: { virtuals: true },
    toJSON: { virtuals: true }//가상 데이터 보내라
});

commentSchema
  .virtual('childComments')
  .get(function () {
    return this._childComments;
  })
  .set(function (v:any) {
    this._childComments = v;
  });//자식이라는 가상 스키마 만들어둠. 이걸로 트리구조 만들때 자식 데이터 여기에 넣을거임

export default mongoose.model<Comment>("comment", commentSchema);