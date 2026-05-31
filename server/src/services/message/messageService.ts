import fs from "fs/promises";
import path from "path";

import { v4 as uuid } from "uuid";

import {
  gitCommit,
  gitPush,
  gitPull,
  REPO_PATH,
} from "../git/gitService";

type WriteMessageInput = {
  room: string;
  userId: string;
  username: string;
  text: string;
};

type Message = {
  id: string;
  userId: string;
  username: string;
  text: string;
  room: string;
  timestamp: number;
};

export const writeMessage = async ({
  room,
  userId,
  username,
  text,
}: WriteMessageInput) => {
  await gitPull();

  const message: Message = {
    id: uuid(),
    userId,
    username,
    text,
    room,
    timestamp: Date.now(),
  };

  const roomPath = path.join(
    REPO_PATH,
    "rooms",
    room
  );

  await fs.mkdir(roomPath, {
    recursive: true,
  });

  const userFilePath = path.join(
    roomPath,
    `${userId}.jsonl`
  );

  const line =
    JSON.stringify(message) + "\n";

  await fs.appendFile(userFilePath, line);

  await gitCommit(
    `[${room}] ${username}: ${text}`
  );

  await gitPush();

  return message;
};

export const readMessages = async (
  room: string
) => {
  const roomPath = path.join(
    REPO_PATH,
    "rooms",
    room
  );

  const files = await fs.readdir(
    roomPath
  );

  const messages: Message[] = [];

  for (const file of files) {
    const filepath = path.join(
      roomPath,
      file
    );

    const content = await fs.readFile(
      filepath,
      "utf-8"
    );

    const lines = content
      .split("\n")
      .filter(Boolean);

    for (const line of lines) {
      messages.push(JSON.parse(line));
    }
  }

  messages.sort(
    (a, b) => a.timestamp - b.timestamp
  );

  return messages;
};
