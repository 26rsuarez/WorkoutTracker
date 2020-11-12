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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false });

//html routes
app.get("/", (req, res)=> {
  res.redirect("index.html")
})

app.get("/exercise", (req, res) => {
    res.redirect("exercise.html")
  });
  
app.get("/stats", (req, res) => {
    res.redirect("stats.html")
  });

//get workouts
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

//get all workouts
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


//create a new workout
app.post("/api/workouts", (req, res) => {
// console.log(body)
db.Workout.create({})
    .then(dbWorkout => {
    res.json(dbWorkout);
    })
    .catch(err => {
    res.json(err);
    });
});

//add to an existing workout
app.put("/api/workouts/:id", (req, res) =>{
    // console.log(req.body)
    db.Workout.findByIdAndUpdate(
          req.params.id
          ,
          {
            $push: {
              exercises: req.body
            }
          }, {new: true}
    ).then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
        res.json(err);
        });
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});