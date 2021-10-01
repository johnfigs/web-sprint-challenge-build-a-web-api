// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const { validateActionId, validateAction, validateActionUpdate } = require('./actions-middlware')

const { validateProjectId } = require('./../projects/projects-middleware')

const router = express.Router()

// [GET] /api/actions
router.get('/', ( req, res, next ) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

// [GET] /api/actions/:id
router.get('/:id', validateActionId, ( req, res ) => {
    res.status(200).json(req.action)
})

// [POST] /api/actions
router.post('/', validateAction, ( req, res, next ) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

// [PUT] /api/actions/:id
router.put('/:id', validateActionId, validateActionUpdate, ( req, res, next ) => {
    Actions.update(req.params.id, req.body)
        .then(something => {
            res.status(200).json(something)
        })
        .catch(next)
})

// [DELETE] /api/actions/:id
router.delete('/:id', validateActionId, ( req, res, next ) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Action has been removed"})
        })
        .catch(next)
})

module.exports = router