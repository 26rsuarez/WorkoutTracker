const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// name, type, weight, sets, reps, and duration of exercise

const exerciseSchema = new Schema({
  type: {
    type: String,
  },

  name: {
    type: String,
    trim: true,
    required: "Enter the name of the exercise."
  },


  duration: {
    type: Number,
    min: [0, 'Must be more than 0']
  },

  weight: {
    type: Number
  },

  reps: {
    type: Number
  },

  sets: {
    type: Number
  },

  distance: {
    type: Number
  }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;