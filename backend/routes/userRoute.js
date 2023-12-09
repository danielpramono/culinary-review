import express from "express";
import { userCon } from "../controllers/userController.js";
const router = express.Router();

router.get('/user', userCon)

export default router;