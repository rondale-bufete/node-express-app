const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config()

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 5000

// EXPRESS APP
const app = express()

// MIDDLEWARE
// VERY IMPORTANT: Place cors middleware BEFORE your routes
const allowedOrigins = [
  'https://workout-planner-zc9k.onrender.com', // Your frontend URL
  'http://localhost:3000' // For local development (optional but good to have)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) { // Allow requests without origin (like Postman) or from allowed origins
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // If you're using cookies or authorization headers, set this to true
  })
);

// MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, ": Passed")
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
        console.log(`DB up and running, Requests are open on port ${port}`)
    })  
})
.catch((error) => {
    console.log(error)
})




