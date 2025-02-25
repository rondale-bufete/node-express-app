const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config()

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 5000

// EXPRESS APP
const app = express()

// CORS / MIDDLEWARE
const allowedOrigins = [
  'https://workout-planner-zc9k.onrender.com',
  'http://localhost:3000'
];

// ALLOW TESTS WITHOUT ORIGIN
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) { 
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // For authorization headers
  })
);

// MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
    if(req.method){
       return console.log(req.method, ": ok") 
    }
    else {
        console.log(req.method, ": failed") 
    }
    next()
})

// ROUTES
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port, () => { 
        // Listen for Requests
        console.log(`DB Connected, Listening on ${port}`)
    })  
})
.catch((error) => {
    console.log(error)
})




