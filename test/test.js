//during the test the environment variable is set to test  process.env.NODE_ENV='test'
//Require the dev dependencies 

let chai = require('chai');
let chaiHTTP=require('chai-http'); 
let server= require('../index.js'); //let modules and the index.js file which allows chai access to the Express app
let should = chai.should();
chai.use(chaiHTTP); //tell chai to use the http module so it can comunicate with the server

//this test deletes amy existing user collection in the test database before each run
/*describe('User', () => {
	beforeEach((done) => { 
		User.remove({}, (err) => {
			done();
		});
	});
    */
//Testing the GET all users.
it('it should GET all the users', (done) => {
	chai.request(server)
		.get('/api/users')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('array');
			res.body.length.should.be.eql(0);
			done();
		});
});



//Test to post a user
it('it should POST a user', (done) => {
		var user = {
			"firstName": "Jane",
			"lastName": "Doe",
			"email": "one@hoo.com",
			"screenName": "JoJo",
			"password": "pass"
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.have.property('firstName');
				res.body.firstName.should.be.a('string');
				res.body.firstName.should.equal('Jane');
				done();
			});
	});


    //Testing POST with a missingrequired field.
it('it should not POST a user without email field', (done) => {
	var user = {
		"firstName": "Jane",
		"lastName": "Doe",
		"screenName": "JoJo",
		"password": "pass"
	}
	chai.request(server)
		.post('/api/users')
		.send(user)
		.end((err, res) => {
			res.should.have.status(500);
			done();
		});
});


//Testing get for a given user ID
it('it should not POST a user without email field', (done) => {
	var user = {
		"firstName": "Jane",
		"lastName": "Doe",
		"screenName": "JoJo",
		"password": "pass"
	}
	chai.request(server)
		.post('/api/users')
		.send(user)
		.end((err, res) => {
			res.should.have.status(500);
			done();
		});
});


//Testing UPDATE
it('it should UPDATE a user', (done) => {

	//Define a valid user document as before with an email other than woo@hoo.com and name other 	//than Joey

        user.save((err, user) => {
                chai.request(server)
                .put('/api/users/')
                .send({
		"_id": user._id,
		"firstName": "Jane",
		"lastName": "Doe",
		"email": "woo@hoo.com",
		"screenName": "Joey",
		"password": "pass"
	})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('woo@hoo.com');
                    res.body.should.have.property('screenName').eql('Joey');
                  done();
                });
          });
      });

//Testing Get with a screenNameit('it should GET a user give the screenName', (done) => {

	//Define a valid user document as before

		user.save((err, user) => {
			chai.request(server)
				.get('/api/users/screenName/' + user.screenName)
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('firstName');
					res.body.should.have.property('lastName');
					res.body.should.have.property('email');
					res.body.should.have.property('screenName');
					res.body.should.have.property('_id').eql(user._id.toString());
					done();
				});
		});
	  });

//Testing deletesit
('it should DELETE a user given the id', (done) => {
        var user = new User({
			"firstName": "Jane",
			"lastName": "Doe",
			"email": "five@hoo.com",
			"screenName": "JoJo",
			"password": "pass"
		});
        user.save((err, user) => {
                chai.request(server)
                .delete('/api/users/' + user.id)
                .end((err, res) => {
		res.should.have.status(204);
		  done();
                });
          });
      });

//Testing updating the following array
it('it should UPDATE a users follow array', (done) => {

	 //Define a valid user document as before

	user.save((err, user) => {
                		chai.request(server)
                		.put('/api/users/follow/' + user._id)
                		.send({
			"_id": "5804ec7fdde8d3035c9bfbcb"
		})
                		.end((err, res) => {					
                    		res.should.have.status(200);
                    		res.body.should.be.a('object');
                    		res.body.should.have.property('follow');
			res.body.follow.should.be.a('array');
			res.body.follow.length.should.be.eql(1);
                  		done();
                		});
          	});
      });



    //create a test to ensure that html is loaded
    it ('it should get the index.html file', (done)=> {
        chai.request(server)
        .get('/index.html')
        .end((err,res)=>{
            res.should.have.status(200); //assertions: http status will be 200 and the content will be html
            res.should.be.html;
            done(); //done indicates that test is complete
        })
    })
)
