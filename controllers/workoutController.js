const Workout = require('../models/workoutsModel')
const mongoose = require('mongoose')

// GET ALL
const getWorkouts = async(req, res) => {
    
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})
    
    res.status(200).json(workouts)
}

// GET SPECIFIC
const getWorkout = async (req, res) => {
    const { id } = req.params

    // Check Mongoose ID Format Validity
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Item Not Found"})
    }

    try {
        const workout = await Workout.findById(id)

        if(!workout) {
            return res.status(400).json({error: "Item Not Found"})
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// CREATE NEW 
const createWorkout = async (req, res) => {

    const {title, reps, sets} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!sets) {
        emptyFields.push('sets')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    // insert item to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, reps, sets, user_id})
        res.status(200).json({workout, message: "Workout Added"})
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}


// DELETE
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    // Check Mongoose ID Format Validity
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Item Not Found"})
    }

    const workout = await Workout.findByIdAndDelete(id)

    if(!workout) {
        return res.status(400).json({error: "Item Not Found"})
    }

    res.status(200).json({mssg: "Item Deleted", workout})
}


// UPDATE
const updateWorkout = async (req, res) => {
    const { id } = req.params
    // Check Mongoose ID Format Validity
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Item Not Found"})
    }

    try{
        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        if (!workout) {
           return res.status(400).json({error: "Item Not Found"})
        }
        res.status(200).json({mssge: "ITEM UPDATED", workout})
    }catch(error) {
        res.status(400).json({error: error.message})
    }

    

    

    
}

module.exports = {
    createWorkout, 
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}