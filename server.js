import express from "express";
import { loadEnvFile } from "process";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
try {
  loadEnvFile();
} catch (err) {
  console.log("loadEnv failed ", err);
}

const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
const NAME = process.env.NAME;
const HOST = process.env.HOST;
const APP = process.env.APP;

const url = `mongodb+srv://${NAME}:${PASSWORD}@${HOST}/${APP}?appName=characters`;
const client = new MongoClient(url);

app.use(express.json(), cors(), express.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
  console.log("request at api/hello");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
