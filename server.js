// mongodb connection from mongodb
import express from "express";
import { loadEnvFile } from "process";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

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
// code from mongodb example
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json(), cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
  console.log("request at api/hello");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
