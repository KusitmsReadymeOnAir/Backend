import { NextFunction, Request, Response } from "express";
import Test from "../models/test";

const getAllData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allData = await Test.find({})
        res.status(200).json({
            testData: allData
        })

    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addTestData = async (req: Request, res: Response, next: NextFunction) => {
    const testData = new Test({
        testId: req.body.testId,
        testComment: req.body.testComment
    });

    try {
        await testData.save();
        res.status(200).json({
            result: "저장 완료"
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}


export default {
    getAllData,
    addTestData
}