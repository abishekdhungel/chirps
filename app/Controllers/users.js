var express = require('express'),
    logger = require('../../config/logger'),
    router = express.Router()
mongoose = require('mongoose')
User = mongoose.model('User')


module.exports = function (app) {
    app.use('/api', router);

    router.route('/users')

        .get(function (req, res, next) { //gets all users
            logger.log('Get User ' + req.params.id, 'verbose');
            var query = User.findById(req.params.id)
                .exec()
                .then(function (result) {
                    res.status(200).json(result);
                })
                .catch(function (err) {
                    return next(err);
                });
        })

        .post(function (req, res) {
            logger.log("Create a users", "verbose");
            res.status(201).json({ msg: "Create a user" });
        })

        .put(function (req, res, next) {
            logger.log('Update a User ' + req.params.id, 'verbose');
            var query = User.findById(req.params.id)
                .exec()
                .then(function (user) {
                    var query = User.findById(req.params.id)
                        .exec()
                        .then(function (user) {
                            if (req.body.firstName !== undefined) {
                                user.firstName = req.body.firstName;
                            };
                            if (req.body.lastName !== undefined) {
                                user.lastName = req.body.lastName;
                            };
                            if (req.body.screenName !== undefined) {
                                user.screenName = req.body.screenName;
                            };
                            if (req.body.email !== undefined) {
                                user.email = req.body.email;
                            };
                            if (req.body.password !== undefined) {
                                user.password = req.body.password;
                            };

                            return user.save();
                        })
                        .then(function (user) {
                            res.status(200).json(user);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                })
        });


    router.route('/users/:id')
        .get(function (req, res, next) {
            logger.log('Get a User ' + req.params.id, 'verbose');
            var query = User.findById(req.params.id)
                .exec()
                .then(function (result) {
                    res.status(200).json(result);
                })
                .catch(function (err) {
                    return next(err);
                });
        })

        .delete(function (req, res, next) { //deletes a user
            logger.log('Delete a User ' + req.params.id, 'verbose');
            var query = User.remove({ _id: req.params.id })
                .exec()
                .then(function (result) {
                    res.status(204).json({ message: 'Record deleted' });
                })
                .catch(function (err) {
                    return next(err);
                });
        });


    router.route('/users/screenName/:name')
        .get(function (req, res) {
            logger.log("Get a user based on the screen name", "verbose");
            res.status(200).json({ msg: "Get a user based on the screen name" });
        });

    router.route('/users/followedChirps/:id')
        .get(function (req, res) {
            logger.log("Get the chirps of the uesrs a user follows", "verbose");
            res.status(200).json({ msg: "Get the chirps of the uesrs a user follows" });
        });

    router.route('/users/follow/:id')
        .put(function (req, res) {
            logger.log("Follow a user", "verbose");
            res.status(200).json({ msg: "Follow a user" })
        })

        .put(function (req, res, next) {
            logger.log('Update User ' + req.params.id, 'verbose');
            var query = User.findOneAndUpdate(
                { _id: req.body._id },
                req.body,
                { new: true })
                .exec()
                .then(function (result) {
                    res.status(200).json(result);
                })
                .catch(function (err) {
                    return next(err);
                });
        });

        }
