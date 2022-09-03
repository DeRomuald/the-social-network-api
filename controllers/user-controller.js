const { User, Thought } = require('../models');

const userControl = {
    // all users
    allUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // user by id
    userById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'Invalid user ID' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // new user
    newUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },


    // edit user 
    editUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'Invalid user ID' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'Invalid user ID' });
                }

            
            })
            .then(() => {
                res.json({ message: 'User has been deleted.' });
            })
            .catch(err => res.status(400).json(err));
    },

    // new friend
    newFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'Invalid user ID' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'Invalid user ID' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

}

module.exports = userControl;