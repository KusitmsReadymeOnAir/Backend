import mongoose, { Schema } from "mongoose";
import Board from "../interfaces/board";
import Counter from "../models/counter";

const boardSchema: Schema = new Schema({
    title : { type : String, required : true},
    content : { type : String, required : true },
    category : { type : String, required : true},
	userId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true }, 
    imageId : { type : String },
    views:{type:Number, default:0},
    numId:{type:Number},
    date : { type : Date, default : new Date() },
}, {
    versionKey: false //__v 필드 제거
})

boardSchema.pre('save', async function(next){
    let board = this;
    if(board.isNew){
        let counter=await Counter.findOne({name:'board'});
        if(!counter){
            counter = await Counter.create({name:'board'});
        }
            console.log("보드"+counter);
            counter.count=+counter.count+1;
            console.log("보드"+counter);
            counter.save();
            board.numId = counter.count;
        
    }
    return next();
})

export default mongoose.model<Board>("Board", boardSchema);