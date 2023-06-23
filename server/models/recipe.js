const mongoose = require("mongoose");
const Joi = require("joi");
const recipeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true },
  ingridients: [
    {
      _id: false, // Disable the _id property
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      measure: { type: String, required: true },
    },
  ],
  instruction: { type: [String], required: true },
  tags: { type: [String], required: true },
  created_at: { type: Date, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  is_private: { type: Boolean, required: true },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const validate = (data) => {
  const schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    time: Joi.number().required(),
    ingridients: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        measure: Joi.string().required(),
      })
    ),
    instruction: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(Joi.string()).required(),
    created_at: Joi.date().required(),
    created_by: Joi.string().required(),
    is_private: Joi.boolean().required(),
  });
  return schema.validate(data);
};

module.exports = { Recipe, validate };
