import { Router } from "express";

import { getBuckets, addBucket } from "../controllers/bucket";

const router: Router = Router();

router.get('/buckets', getBuckets);

export default router;