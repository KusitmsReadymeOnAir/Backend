import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";
import config from "./config";

AWS.config.update({
    accessKeyId : config.accessKeyId,
    secretAccessKey : config.secretAccessKey,
    region : 'ap-northeast-2',
});

const upload = multer({
    storage : multerS3({
        s3 : new AWS.S3(),
        bucket : 'kusitms-readyme-3',
        contentType : multerS3.AUTO_CONTENT_TYPE,
        key : (req : Express.Request, file : Express.Multer.File, cb : (error: any, key?: string | undefined) => void) => {
            cb(null, `image/${Date.now()}_${Math.floor(Math.random() * 10)}`);
        }
    }),
    limits : { fileSize : 5*1024*1024}
});

export default upload;