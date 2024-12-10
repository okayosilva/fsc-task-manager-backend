const express = require("express");
const dotenv = require("dotenv");

const { connectToDatabase } = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();

connectToDatabase();
app.use(express.json());

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    const body = req.body;
    try {
        const newTask = new TaskModel(body);
        await newTask.save();

        res.status(201).send(newTask);
    } catch {
        res.status(500).send(error.message);
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
