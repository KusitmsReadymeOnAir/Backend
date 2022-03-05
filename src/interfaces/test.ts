import { Document } from "mongoose";

export default interface Test extends Document {
    testId: number,
    testComment: string
}