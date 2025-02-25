const express = require('express')
const {
 createWorkout, 
 getWorkouts,
 getWorkout,
 deleteWorkout,
 updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Verify if request is authorized before fetching items
router.use(requireAuth)

// GET ALL
router.get('/', getWorkouts)

// GET A SPECIFIC
router.get('/:id', getWorkout)

// POST A NEW
router.post('/', createWorkout)

// DELETE ITEM
router.delete('/:id', deleteWorkout)

// UPDATE ITEM
router.patch('/:id', updateWorkout)

module.exports = router