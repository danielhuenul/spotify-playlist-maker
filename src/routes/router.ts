import express from 'express';
import simpleController from 'controller/simple.controller';
const router = express.Router()

router.get("/", simpleController);

export default router;