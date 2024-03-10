const { handleMessage } = require("./lib/Telegram");
import { Request } from "express";

async function handler(req: Request) {
  const { body } = req;
  if (body) {
    const messageObj = body.message;
    await handleMessage(messageObj);
  }
}

module.exports = { handler };
