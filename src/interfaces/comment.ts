import { Document } from "mongoose";
import { ObjectId } from "aws-sdk/clients/codecommit";

export default interface Comment extends Document {
<<<<<<< HEAD
    boardId: Number,
    userId : ObjectId,
    createdAt:Date,
    comment: String,
    parentComment : ObjectId,
    isDeleted : Boolean
<<<<<<< HEAD
}
=======
<<<<<<< HEAD
}
>>>>>>> f5fccb3 (임시 커밋)
=======
    boardId: ObjectId,
    pw : Number, 
    createdAt:Date,
    Comment: String,
    parentComment: ObjectId,
    isDeleted:Boolean,
    userId:String
}
>>>>>>> b2dec4a (사용자 join)
>>>>>>> 8daba4c (충돌 해결)
