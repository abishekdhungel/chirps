
var passportService = require('../../Config/passport')
var passport = require('passport')
var express = require('express'),
    logger = require('../../config/logger'),
    router = express.Router()
mongoose = require('mongoose')
User = mongoose.model('User');

var requireLogin = passport.authenticate('local', { session: false });
 

module.exports = function (app) {
 
   
    app.use('/api', router);
 

router.route('/users/login').post(requireLogin, login);
    // function(req, res, next){console.log(req.body);res.status(200).json({msg: "it worked"})});

    router.route('/users')

        .get(function (req, res, next) { //gets all users
            logger.log('Get User ' + req.params.id, 'verbose');
            var query = User.find()
                .exec()
                .then(function (result) {
                    res.status(200).json(result);
                })
                .catch(function (err) {
                    return next(err);
                });
        })

      
//Post a user//
        .post(function (req, res, next) {
      logger.log('Create User', 'verbose');
      var user = new User(req.body);
      user.save()
      .then(function (result) {
          res.status(201).json(result);
      })
      .catch(function(err){
         return next(err);
      });
    })

        

        

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
        })

        .put(function (req, res, next) {
            logger.log('Update a User ' + req.params.id, 'verbose');
            var query = User.findById(req.params.id)
                .exec()
                .then(function (user) {
                    var query = User.findById(req.params.id)
                        .exec()
                        .then(function (user) {
                            if (req.body.fname !== undefined) {
                                user.fname = req.body.fname;
                            };
                            if (req.body.lname !== undefined) {
                                user.lname = req.body.lname;
                            };
                            if (req.body.screenName !== undefined) {
                                user.screenName = req.body.screenName;
                            };
                            if (req.body.email !== undefined) {
                                user.email = req.body.email;
                            };
                            if (req.body.Password !== undefined) {
                                user.Password = req.body.Password;
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


    router.route('/users/screenName/:name')
        .get(function (req, res, next) {
            logger.log('Get User' + req.params.id, 'verbose');
            User.findOne({screenName:req.params.name})
            .exec()
            .then (function(user) {
            res.status(200).json(user);
        })
         .catch(function (err) {
                    return next(err);
                });
                   });

    router.route('/users/followedChirps/:id')
       .get(function (req, res, next) {
      		logger.log('Get Users followed chirps ' + req.params.id, 'verbose');
      		User.findOne({ _id: req.params.id })
			.then(function(user){
	        			Chirp.find({$or: [{ chirpAuthor: user._id }, { chirpAuthor: { $in: user.follow } }]})
				.populate('screenName')
				.sort('-dateCreated')
				.exec()
					.then(function (chirps) {
						res.status(200).json(chirps);
					})
			})
			.catch(function(err){
				return next(error);
			});
	});

    router.route('/users/follow/:id')

        .put(function (req, res, next) {
            logger.log('Update User ' + req.params.id, 'verbose');
           User.findOne({ _id: req.params.id }).exec()
			.then(function (user) {
				if (user.follow.indexOf(req.body._id) == -1) {
					user.follow.push(req.body._id);
					user.save()
						.then(function ( user) {
							res.status(200).json(user);
						})
				} else {
res.status(200).json(user);
}
			})
			.catch(function (err) {
				return next(err);
			});
		});

        }
