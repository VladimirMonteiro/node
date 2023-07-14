const express = require('express')
const TaskController = require('../controllers/TaskController')
const Task = require('../models/Task')
const router = express.Router()


router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)
router.get('/edit/:id', TaskController.uptadeTask)
router.post('/edit', TaskController.uptadeTaskSave)
router.post('/uptadestatus', TaskController.toggleTaskStatus)
router.get('/', TaskController.showTasks)


module.exports = router