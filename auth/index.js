import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import db from "./config/db.js";

db()
  .then(function () {
    const port = process.env.PORT || 4001;
    app.listen(port, function () {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(function (error) {
    console.log(
      error instanceof Error
        ? error.message
        : `Failed to connect with mongo: ${error}`
    );
  });
