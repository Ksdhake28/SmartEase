const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();

// MongoDB configuration
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "SmartEase";
let db;

// Connect to MongoDB once on server startup
async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDb();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Test route to verify server is working
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Route to handle data insertion into MongoDB
app.post("/UT-records", async (req, res) => {
  const { name, subject, marks } = req.body;

  console.log("Name:", name);
  console.log("Subject:", subject);
  console.log("Marks:", marks);

  if (!name || !subject || !marks) {
    return res.status(400).json({ message: "Subject and marks are required" });
  }

  let dynamicData = {
    [`marks.${subject}`]: marks, // Dynamically set marks for the subject
  };

  try {
    const collection = db.collection("ut-infos");

    // Update the document if the subject exists, otherwise insert a new one
    let result = await collection.updateOne(
      { Name: name }, // Query to find the document by name
      { $set: dynamicData }, // Update marks for the subject
      { upsert: true } // Insert if no document exists for the subject (upsert)
    );

    res.json({
      message: "Marks saved successfully",
      documentUpdated: dynamicData,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while saving data",
      error: error.message,
    });
  }
});

// Route to fetch all UT records
app.get("/marks", async (req, res) => {
  try {
    const collection = db.collection("ut-infos");
    const data = await collection.find({}).toArray();

    if (data.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching records",
      error: error.message,
    });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
