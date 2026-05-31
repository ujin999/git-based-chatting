import { Request, Response } from "express";

import {
  writeMessage,
  readMessages,
} from "../services/message/messageService";

export const createMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      room,
      userId,
      username,
      text,
    } = req.body;

    if (
      !room ||
      !userId ||
      !username ||
      !text
    ) {
      return res.status(400).json({
        error:
          "room, userId, username, text are required",
      });
    }

    const message = await writeMessage({
      room,
      userId,
      username,
      text,
    });

    return res.json(message);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "failed to create message",
    });
  }
};

export const getMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const roomParam = req.params.room;

    const room = Array.isArray(roomParam)
      ? roomParam[0]
      : roomParam;

    if (!room) {
      return res.status(400).json({
        error: "room is required",
      });
    }

    const messages = await readMessages(
      room
    );

    return res.json(messages);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "failed to read messages",
    });
  }
};
