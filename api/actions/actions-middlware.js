// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId( req, res, next ) {
    try {
        const foundAction = await Actions.get( req.params.id )
        if( foundAction ) {
            req.action = foundAction
            next()
        } else {
            next( {status: 404, message: "Action not found"} )
        }
    } catch( error ) {
        next( error )
    }
}

function validateAction ( req, res, next ) {
    const { project_id, description, notes } = req.body
    if( !project_id || !description || !notes ) {
        next({ status: 400, message: "Please project id, description, and notes"})
    } else {
        next()
    }
}

function validateActionUpdate(req, res, next) {
    const { project_id , description, notes } = req.body
    if( !project_id || !description || !notes ) {
        next({ status: 400, message: "Please provide name and description"})
    } else {
        next()
    }
}

module.exports = {
    validateActionId, 
    validateAction,
    validateActionUpdate,
}