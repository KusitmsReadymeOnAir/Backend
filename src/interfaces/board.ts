import { ObjectId } from "aws-sdk/clients/codecommit";
import { Document } from "mongoose";

export default interface Board extends Document {
    title : string,
    content : string,
    category : string, //'디자인', '개발', '기획', '프로젝트모집', '일상'
    userId : ObjectId,
    imageId : string,
    views: Number,
    numId:Number,
    date : Date
}