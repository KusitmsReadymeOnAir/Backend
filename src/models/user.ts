import mongoose, { Schema } from "mongoose";
import User from "../interfaces/user";

const userSchema: Schema = new Schema({
    googleId: { type: String, required: true },
    name : { type : String, required : true},
    email : { type : String, required : true}
}, {
    versionKey: false //__v 필드 제거
})

export default mongoose.model<User>("User", userSchema);