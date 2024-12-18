const TaskModel = require("../models/task.model");
const { notFoundError } = require("../errors/mongodb.errors");
class TaskController {
    constructor(request, response) {
        this.req = request;
        this.res = response;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).json(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        const { id } = this.req.params;
        try {
            const findTaskById = await TaskModel.findById(id);
            if (!findTaskById) {
                notFoundError(this.res);
            }

            this.res.status(200).send(findTaskById);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        const body = this.req.body;
        try {
            const newTask = new TaskModel(body);
            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        const { id } = this.req.params;
        const taskData = this.req.body;

        try {
            const taskToUpdate = await TaskModel.findById(id);

            if (!taskToUpdate) {
                notFoundError(this.res);
            }

            const allowedUpdates = ["isCompleted"];
            const requestUpdates = Object.keys(taskData);

            for (const update of requestUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    this.res
                        .status(400)
                        .send("Invalid update allowed only isCompleted");
                }
            }

            await taskToUpdate.save();
            this.res.status(200).send(taskToUpdate);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async delete() {
        const { id } = this.req.params;
        try {
            const findTask = await TaskModel.findById(id);
            if (!findTask) {
                notFoundError(this.res);
            }

            await TaskModel.deleteOne({ _id: id });

            this.res.status(200).send(findTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = { TaskController };
