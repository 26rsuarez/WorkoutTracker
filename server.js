const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/exercise", (req, res) => {
    res.redirect("exercise.html")
  });
  
app.get("/stats", (req, res) => {
    res.redirect("stats.html")
  });

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });



app.post("/api/workouts", ({ body }, res) => {
console.log(body)
db.Workout.create(body)
    .then(dbWorkout => {
    res.json(dbWorkout);
    })
    .catch(err => {
    res.json(err);
    });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});