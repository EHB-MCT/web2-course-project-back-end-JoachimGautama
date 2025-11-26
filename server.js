import express from "express";
import { loadEnvFile } from "process";
import cors from "cors";

const app = express();
try {
  loadEnvFile();
} catch (err) {
  console.log("loadEnv failed ", err);
}

const PORT = process.env.PORT || 3000;
const TEST = process.env.TEST || "no env present";

app.use(express.json(), cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
  console.log("request at api/hello");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  console.log(TEST);
});
