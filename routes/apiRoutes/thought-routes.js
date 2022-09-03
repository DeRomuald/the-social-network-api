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

thoughtRouter.route('/').get(allThoughts);


thoughtRouter.route('/:userId').post(newThought);


thoughtRouter
    .route('/:thoughtId')
    .get(thoughtById)
    .put(editThought)

thoughtRouter
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

thoughtRouter
    .route('/:thoughtId/reactions')
    .post(newReaction);

thoughtRouter
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = thoughtRouter;