// MongoDB CRUD manual was used to complete this code
import express from "express";
import { loadEnvFile } from "process";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
try {
  loadEnvFile();
} catch (err) {
  console.log("loadEnv failed: ", err);
}

const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
const NAME = process.env.NAME;
const HOST = process.env.HOST;
const APP = process.env.APP;
const APPNAME = process.env.APPNAME;

const url = `mongodb+srv://${NAME}:${PASSWORD}@${HOST}/${APP}?appName=${APPNAME}`;
const client = new MongoClient(url);

app.use(express.json(), cors(), express.urlencoded({ extended: true }));

app.post("/auth/characters", async (req, res) => {
  const { id, name } = req.body;
  console.log("auth request");
  try {
    await client.connect();
    const mdb = client.db("spellSheet");
    const collection = mdb.collection("characters");

    const requestedChar = await collection.findOne({ name: name });

    if (!requestedChar) {
      return res.status(404).json({
        error: "NAT 1 perception!",
        field: "name",
      });
    }

    const reqID = requestedChar._id.toString();
    if (id !== reqID) {
      return res.status(401).json({
        error: "Disguise self failed",
        field: "code",
      });
    }

    res.status(200).json({
      success: true,
      character: requestedChar,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Server rolled a 1!",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
