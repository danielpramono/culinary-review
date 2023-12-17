import express  from "express";
import {google} from "../controllers/googleController.js";
const router = express.Router();

router.post('/google', google);

export default router