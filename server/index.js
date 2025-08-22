import app from "./app.js";
import dotenv from "dotenv";
import { connect } from "./src/dbConfig/db.js";

dotenv.config();

const PORT = process.env.PORT;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
    app.on("Error", (error) => {
      console.log("Error", error);
    });
  })
  .catch((error) => {
    console.error(error);
  });
