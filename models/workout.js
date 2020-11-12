const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {type: {
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
    }}
  ]
},
{
  toJSON: {
    virtuals: true
  }
}
);

workoutSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;