const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./src/routes/task.routes");

const { connectToDatabase } = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDatabase();
app.use(express.json());

app.use("/tasks", taskRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
