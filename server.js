const express = require ('express')
const mongoose = require('mongoose')

require('dotenv').config()

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 5000

// EXPRESS APP
const app = express()

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




