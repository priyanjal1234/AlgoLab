import dotenv from "dotenv";
dotenv.config();

import { Vonage } from "@vonage/server-sdk";
import fs from "fs";
import path from "path";

const vonage = new Vonage({
  applicationId: "5fe70c0c-16bb-442b-9ed2-3cb5423eecf5", 
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
      to: [{ type: "phone", number: "+918218411944" }],
      from: { type: "phone", number: "447700900000" },
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
