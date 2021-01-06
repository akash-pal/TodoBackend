import { Request, Response, NextFunction } from "express";
import { IBucket } from "../../types/bucket";
import Bucket from "../../models/buckets";

const getBuckets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const buckets: IBucket[] = await Bucket.find();
        res.status(200).json(buckets);
    }
    catch (error) {
        next(error);
    }
}

export { getBuckets };