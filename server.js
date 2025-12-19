import express from "express";
import { loadEnvFile } from "process";
import cors from "cors";
import { MongoClient } from "mongodb";
import * as z from "zod";

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
const collection = client.db("spellSheet").collection("characters");

app.use(express.json(), cors(), express.urlencoded({ extended: true }));

app.post("/characters", async (req, res) => {
  const data = req.body;

  try {
    try{
      const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]); // code from zod documentation https://zod.dev/api#enums
      data = z.object({
      name: z.string(),
      class: 
    })
    } catch (error){
      return res.status(422).json({
        error: "Oops! Reroll that intelligence check!",
        message: error.message
      })
    }
    const response = await collection.insertOne(data);
    res.status(200).json({
      success: true,
      character: response,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server rolled a nat 1!",
      message: error.message,
    });
  }
});

app.post("/auth/characters", async (req, res) => {
  const { id, name } = req.body;
  console.log("auth request");
  try {
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
