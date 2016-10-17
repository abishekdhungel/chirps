var express = require('express'),
    logger = require('../../config/logger'),
    router = express.Router()
    
mongoose = require('mongoose')
User = mongoose.model('User')
  

module.exports = function (app) {
    app.use('/api', router);

    router.route('/users')


.get(function (req, res, next) {
      logger.log('Get User ' + req.params.id, 'verbose');
      var query = User.findById(req.params.id)
        .exec()
        .then(function (result) {
          res.status(200).json(result);
        })
        .catch(function(err) {
          return next(err);
        });
    })

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


.put(function (req, res, next) {
      logger.log('Update User ' + req.params.id, 'verbose');
      var query = User.findById(req.params.id)
        .exec()
        .then(function (user) {
var query = User.findById(req.params.id)
        .exec()
        .then(function (user) {
          if (req.body.firstName !== undefined) {
            user.firstName = req.body.firstName;};
          if (req.body.lastName !== undefined) {
            user.lastName = req.body.lastName;};
          if (req.body.screenName !== undefined) {
            user.screenName = req.body.screenName;};
          if (req.body.email !== undefined) {
            user.email = req.body.email;
          };
          if (req.body.password !== undefined) {
            user.password = req.body.password;
          };

          return user.save();
        })
    .then(function(user) {
          res.status(200).json(user);
        })
        .catch(function (err) {
          return next(err);
        });
    })
})


    router.route('/users/:id')
        .get(function (req, res) {
            logger.log("Get a user", "verbose");
            res.status(200).json({ msg: "GET a users" });
        })


        .delete(function (req, res) {
            logger.log("Deletes a user", "verbose");
            res.status(200).json({ msg: "Delete a user" });
        });
    router.route('/users/screenName/:name')
        .GET(function (req, res) {
            logger.log("Get a user based on the screen name", "verbose");
            res.status(200).json({ msg: "Get a user based on the screen name" });
        })

    router.route('/users/followedChirps/:id)
        .GET(function (req, res) {
            logger.log("Get the chirps of the uesrs a user follows", "verbose");
            res.status(200).json({ msg: "Get the chirps of the uesrs a user follows" });
        })

    router.route('/users/follow/:id')
            .PUT(function (req, res) {
                logger.log("Follow a user", "verbose");
                res.status(200).json({ msg: "Follow a user" })
            })
}
