import mongoose, { Schema } from "mongoose";
import Counter from "../interfaces/counter";

const counterSchema: Schema = new Schema({
    name: { type: String, required: true },
    count : { type : Number, default:0}
}, {
    versionKey: false //__v 필드 제거
})

export default mongoose.model<Counter>("Counter", counterSchema);