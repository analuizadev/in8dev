const Form = require("../models/Form");

class FormController {
  async register(req, res) {
    const { name, email, phoneNumber } = req.body;
    const errors = validateForm(req.body);
    if (errors.length != 0) {
      res.status(400).send({ errors });
      return;
    }

    const hasUser = await Form.findOne({ email });
    if (hasUser) {
      res.status(400).send("User already exists");
      return;
    }

    const [day, month, year] = req.body.birthdate.split("/");
    const birthdate = new Date(year, month - 1, day);
    const form = new Form({
      name,
      email,
      phoneNumber,
      birthdate,
    });

    try {
      await form.save();
    } catch (e) {
      res.status(503).send(e);
      return;
    }

    res.send(form);
  }

  async getAll(req, res) {
    try {
      const users = await Form.find();
      res.send(users);
    } catch (e) {
      res.status(503).send(e);
    }
  }
}

const validateForm = (body) => {
  const { name, email, phoneNumber, birthdate } = body;
  const errors = [];

  if (!name || name == "") {
    errors.push("Nome vazio");
  }

  if (!email || email == "") {
    errors.push("Email vazio");
  }

  if (!phoneNumber || phoneNumber == "") {
    errors.push("Número de Telefone vazio");
  }

  if (!birthdate || birthdate == "" || birthdate.split("/").length != 3) {
    errors.push("Formato de data inválido. Esperado: DD/MM/YYYY");
  }

  return errors;
};

module.exports = new FormController();
