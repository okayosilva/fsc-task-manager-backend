const notFoundError = (res) =>
    res.status(404).send("Esta tarefa não foi encontrada!");

const objectIdCastError = (res) =>
    res.status(400).send("O ID fornecido não é válido!");

module.exports = { notFoundError, objectIdCastError };
