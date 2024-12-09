const express = require("express");
const dotenv = require("dotenv");

const { connectToDatabase } = require("./src/database/mongoose.database");

dotenv.config();
const app = express();
connectToDatabase();

app.get("/tasks", (req, res) => {
    const tasks = [
        { description: "Task 1 description", isCompleted: false },
        { description: "Task 2 description", isCompleted: false },
        { description: "Task 3 description", isCompleted: false },
    ];
    res.status(200).json(tasks);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
