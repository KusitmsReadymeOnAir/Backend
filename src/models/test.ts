import mongoose, { Schema } from "mongoose";
import Test from "../interfaces/test";

const testSchema: Schema = new Schema({
    testId: { type: Number, required: true },
    testComment: { type: String, required: true }
}, {
    versionKey: false //__v 필드 제거
})

export default mongoose.model<Test>("Test", testSchema);