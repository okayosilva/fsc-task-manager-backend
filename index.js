const express = require("express");
const dotenv = require("dotenv");

const { connectToDatabase } = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
connectToDatabase();

app.get("/tasks", async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).json(tasks);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
