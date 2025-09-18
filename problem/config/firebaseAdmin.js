import fs from "fs";
import path from "path";
import admin from "firebase-admin";

const serviceAccountPath = path.resolve("./config/serviceAccountKey.json");

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
