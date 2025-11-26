import express from "express";
import { loadEnvFile } from "process";
import cors from "cors";
const app = express();
loadEnvFile();
const PORT = process.env.PORT || 3000;
const TEST = process.env.TEST || "no env present";

app.use(express.json(), cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  console.log(TEST);
});
