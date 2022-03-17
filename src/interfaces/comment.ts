import { Document } from "mongoose";
import { ObjectId } from "aws-sdk/clients/codecommit";

export default interface Comment extends Document {
    boardId: Number,
    userId : ObjectId,
    createdAt:Date,
    comment: String,
    parentComment : ObjectId,
    isDeleted : Boolean
<<<<<<< HEAD
}
=======
}
>>>>>>> f5fccb3 (임시 커밋)
