const { Thought } = require('../models/Thought');
const User = require('../models/User');

const thoughtControl = {
    //all thoughts
    allThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //thought by id
    thoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'Invalid thought ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // new thought
    newThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'Invalid user ID' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    //edit thought
    editThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'Invalid thought ID' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'Invalid thought ID' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'Invalid user ID' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    //new reaction
    newReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove reaction
    deleteReaction({ params }, res) {
        console.log(params.thoughtId, params.reactionId);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtControl;