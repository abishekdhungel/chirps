var express = require('express'),
    logger = require('../../config/logger'),
    router = express.Router()
    mongoose = require('mongoose')
    Chirp = mongoose.model('Chirp')

module.exports = function (app) {
    app.use('/api', router);

    router.route('/chirps')


     .get(function (req, res, next) { //gets all users
            logger.log('Get all chirps ' + req.params.id, 'verbose');
            var query = Chirp.find()
                .exec()
                .then(function (result) {
                    res.status(200).json(result);
                })
                .catch(function (err) {
                    return next(err);
                });
        })



        .post(function (req, res, next) {
      logger.log('Create a Chirp', 'verbose');
      var chirp = new Chirp(req.body);
      chirp.save()
      .then(function (result) {
          res.status(201).json(result);
      })
      .catch(function(err){
         return next(err);
      });
    })

    
       // .put(function (req, res) {
          //  logger.log("Update a chirps", "verbose");
         //   res.status(200).json({ msg: "Update a chirps" });
       // });
///This needs to be working and
// an API to rechirp needs to be created--
        .put(function (req, res, next) {
            logger.log('Update a Chirp ' + req.params.id, 'verbose');
            var query = Chirp.findById(req.params.id)
                .exec()
                .then(function (chirp) {
                    var query = Chirp.findOne({_id: req.params.id}).exec()
                        .exec()
                        .then(function (user) {
                            if (req.body.chirp !== undefined) {
                                user.chirp = req.body.chirp;
                            };
                            return chirp.save();
                        })
                        .then(function (chirp) {
                            res.status(200).json(user);
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                })
        });



    router.route('/chirps/:id')
            .get(function (req, res, next) {
            logger.log('Get a Chirp ' + req.params.id, 'verbose');
            var query = Chirp.findById(req.params.id)
                .exec()
                .then(function (result) {
                    res.status(200).json(result);
                })
                .catch(function (err) {
                    return next(err);
                });
        })



       .delete(function (req, res, next) { //deletes a chirp
            logger.log('Delete a Chirp ' + req.params.id, 'verbose');
            var query = Chirp.remove({ _id: req.params.id })
                .exec()
                .then(function (result) {
                    res.status(204).json({ message: 'Record deleted' });
                })
                .catch(function (err) {
                    return next(err);
                });
        })

    router.route('/chirps/userchirps/:id')
     .get( function(req, res,next){
		logger.log('Get User Chirps ' + req.params.id, 'verbose');
		Chirp.find({chirpAuthor: req.params.id})
			.populate('chirpAuthor')
			.sort("-dateCreated")
			.exec()
			.then(function(chirps){
				res.status(200).json(chirps);
			})
			.catch(function(err){
				return next(err);
			})
	});



    router.route('/chirps/like/:id')
              .put( function(req, res, next){
      	logger.log('Update Chirp ' + req.params.id,'debug');
      	Chirp.findOne({_id: req.params.id}).exec()
		.then(function(chirp){
          			chirp.likes++;
          			return chirp.save();
		})
		.then(function(chirp){
			res.status(200).json(chirp);
		})
	.catch(function (err) {
		return next(err);
	});
    });
}


