import mongoose, { Schema } from "mongoose";
import Board from "../interfaces/board";

const boardSchema: Schema = new Schema({
    title : { type : String, required : true},
    content : { type : String, required : true },
    category : { type : String, required : true},
	userId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true }, 
    imageId : { type : String },
    date : { type : Date, default : Date.now },
}, {
    versionKey: false //__v 필드 제거
})

export default mongoose.model<Board>("Board", boardSchema);