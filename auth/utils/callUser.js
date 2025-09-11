import dotenv from "dotenv";
dotenv.config();

import { Vonage } from "@vonage/server-sdk";
import fs from "fs";
import path from "path";

const vonage = new Vonage({
  applicationId: "554d4577-fa4c-43a4-a6b2-53a034ca56cb",
  privateKey: fs.readFileSync(path.resolve("secret", "private.key"), "utf8"),
});

async function callUser(phoneNumber, code) {
  const ncco = [
    {
      action: "talk",
      voiceName: "Joey",
      text: `Hello. Your verification code is ${code}. I repeat, ${code}.`,
    },
  ];

  try {
    const response = await vonage.voice.createOutboundCall({
      to: [{ type: "phone", number: phoneNumber }],
      from: { type: "phone", number: "12345678901" },
      ncco,
    });

    console.log("Call initiated:", response.uuid);
    return response;
  } catch (err) {
    console.error("Error making call:", err.response?.data || err);
    throw err;
  }
}

export default callUser;
