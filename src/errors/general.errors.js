const notAllowedFieldsToUpdateError = (res) =>
    res.status(400).send("Um ou mais campos não são editáveis!");

module.exports = { notAllowedFieldsToUpdateError };
