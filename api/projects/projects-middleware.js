// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const foundProject = await Projects.get(req.params.id)
        if (foundProject) {
            req.project = foundProject
            next()
        } else {
            next({ status: 404, message: "Project not found"})
        }
    } catch(error) {
        next(error)
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if( !name || !description ) {
        next({ status: 400, message: "Please provide name and description"})
    } else {
        next()
    }
}

function validateProjectUpdate(req, res, next) {
    const { name, description, completed } = req.body
    if( !name || !description || completed == null ) {
        next({ status: 400, message: "Please provide name and description"})
    } else {
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateProjectUpdate
}