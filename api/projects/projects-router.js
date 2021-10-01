// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const { validateProjectId, validateProject, validateProjectUpdate } = require('./projects-middleware')

const router = express.Router()

// [GET] /api/projects
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

// [GET] /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

// [POST] /api/projects
router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(200).json(newProject)
        })
        .catch(next)
})

// [PUT] /api/projects/:id
router.put('/:id', validateProjectId, validateProjectUpdate, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(something => {
            res.status(200).json(something)
        })
        .catch(next)
})

// [DELETE] /api/projects/:id
router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Project has been removed"})
        })
        .catch(next)
})

// [GET] /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

module.exports = router