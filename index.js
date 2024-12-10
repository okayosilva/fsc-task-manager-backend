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

app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const findTaskById = await TaskModel.findById(id);
        if (!findTaskById) {
            res.status(404).send("Task not found");
        }

        res.status(200).send(findTaskById);
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

app.patch("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const taskData = req.body;

    try {
        const taskToUpdate = await TaskModel.findById(id);
        const allowedUpdates = ["isCompleted"];
        const requestUpdates = Object.keys(taskData);

        for (update of requestUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                res.status(400).send("Invalid update allowed only isCompleted");
            }
        }

        await taskToUpdate.save();
        res.status(200).send(taskToUpdate);
    } catch {
        res.status(500).send(error.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const findTask = await TaskModel.findById(id);
        if (!findTask) {
            res.status(404).send("Task not found");
        }

        await TaskModel.deleteOne({ _id: id });

        res.status(200).send(findTask);
    } catch {
        res.status(500).send(error.message);
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
