import { Router } from "express";

import {
  createMessage,
  getMessages,
} from "../controllers/messageController";

const router = Router();

router.post("/", createMessage);

router.get("/:room", getMessages);

export default router;
