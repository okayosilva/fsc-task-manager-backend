const notFoundError = (res) =>
    res.status(404).send("Esta tarefa não foi encontrada!");

module.exports = { notFoundError };
