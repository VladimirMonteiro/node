const { where } = require('sequelize')
const Task = require('../models/Task')



module.exports = class TaskController{

    static createTask(req, res){
        res.render('tasks/create')
    }

    static async showTasks(req,res){
        
        
        const tasks = await Task.findAll({raw: true})
        
        
        res.render('tasks/all', {tasks})
    }

    static async createTaskSave(req, res){
        const {title, description} = req.body

        const task = {
            title,
            description,
            done: false
        }

        const taskCreated = await Task.create(task)

        res.redirect('/tasks')
        

    }

    static async removeTask(req, res){

        const id = req.body.id

        await Task.destroy({where:{id: id}})

        res.redirect('/tasks')
    }

    static async uptadeTask(req, res){
        
        const id = req.params.id

        const task = await Task.findOne({raw: true, where: {id:id}})

        res.render('tasks/edit', {task})
    }

    static async uptadeTaskSave(req, res){

        const id = req.body.id

        const task = {
            title: req.body.title,
            description: req.body.description
        }

        await Task.update(task, {where: {id: id}})

        res.redirect('/tasks')
    }

    static async toggleTaskStatus(req, res){

        const id = req.body.id

        const task = {
            done: req.body.done === '0' ? true : false
        }

        await Task.update(task, {where: { id: id}})

        res.redirect('/tasks')

    }
}