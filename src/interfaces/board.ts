import { ObjectId } from "aws-sdk/clients/codecommit";
import { Document } from "mongoose";

export default interface Board extends Document {
    title : string,
    content : string,
    category : string,
    userId : ObjectId,
    imageId : string,
    views: Number,
    numId:Number,
    date : Date
}