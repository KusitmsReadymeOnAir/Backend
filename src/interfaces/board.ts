import { Document } from "mongoose";

export default interface Board extends Document {
    title : string,
    content : string,
    category : string, //'디자인', '개발', '기획', '프로젝트모집', '일상'
    writer : string,
    pw : number,
    imageId : string,
    date : Date
}