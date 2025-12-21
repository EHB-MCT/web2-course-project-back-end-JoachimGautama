import express from "express";
import { loadEnvFile } from "process";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { Check } from "./Check.js";

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
    try {
      Check.checkCharacter(data);
    } catch (error) {
      return res.status(422).json({
        error: "Oops! Reroll that intelligence check!",
        message: error.message,
      });
    }
    const response = await collection.insertOne(data);
    const id = new ObjectId(response.insertedId.toString());

    const char = await collection.findOne({ _id: id });

    res.status(200).json({
      success: true,
      character: char,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server rolled a 1!",
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

app.patch("/characters", async (req, res) => {
  try {
    const fields = req.body;
    const id = new ObjectId(fields.id);

    const exists = collection.findOne({ _id: id });
    if (!exists)
      return res
        .status(404)
        .json({ message: "Must have rolled perfect stealth!" });

    let updates = {};
    for (const key in fields) {
      if (key !== "id") updates[key] = fields[key];
    }

    await collection.updateOne({ _id: id }, { $set: updates });
    res.status(200).json({ success: true, message: "Update successful." });
  } catch (error) {
    res.status(500).json({ success: false, message: "server rolled a 1!" });
  }
});

app.delete("/characters/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const result = await collection.findOneAndDelete({ _id: id });
    if (!result)
      return res.status(404).json({
        success: false,
        message: "Must have rolled a perfect stealth check!",
      });

    return res.status(200).json({
      success: true,
      message: `${result.name} was successfully slain!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server rolled a 1!",
    });
  }
});

app.get("/pingMe", (req, res) => {
  return res.status(200).json({
    message: "ha-ha-ha-ha stayin' alive!",
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

async function keepAlive() {
  try {
    const res = await fetch("https://spellsheet.onrender.com/pingMe");
    const msg = await res.text();
    console.log(msg);
  } catch (error) {
    console.log(error);
  }
}

setInterval(keepAlive, 60000);
