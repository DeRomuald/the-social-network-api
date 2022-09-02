const thoughtRouter = require('express').Router();
const {
    allThoughts,
    newThought,
    thoughtById,
    editThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

// /api/thoughts
thoughtRouter.route('/').get(allThoughts);

// /api/thoughts/<userId>
thoughtRouter.route('/:userId').post(newThought);

// /api/thoughts/<thoughtId>
thoughtRouter
    .route('/:thoughtId')
    .get(thoughtById)
    .put(editThought)

// /api/thoughts/<userId>/<thoughtId>
thoughtRouter
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions
thoughtRouter
    .route('/:thoughtId/reactions')
    .post(newReaction);

// /api/thoughts/<thoughtId>/reactions/<reactionId>
thoughtRouter
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = thoughtRouter;