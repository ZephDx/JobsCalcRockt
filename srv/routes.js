const express = require('express')
const routes = express.Router()
const ProfileController = require('./controller/ProfileController')
const JobController = require('./controller/JobController')
const DashboardController = require('./controller/DashboardController')

routes.get('/', DashboardController.index)
routes.get('/job', JobController.save) 
routes.post('/job', JobController.create) 
routes.get('/job/:id', JobController.show) 
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete) 
routes.get('/profile', ProfileController.index )
routes.post('/profile', ProfileController.update )


module.exports = routes;