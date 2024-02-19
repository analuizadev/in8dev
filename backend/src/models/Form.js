const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    require: true,
  },

  birthdate: {
    type: Date,
    require: true,
  },
});

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
