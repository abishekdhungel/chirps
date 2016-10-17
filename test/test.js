//during the test the environment variable is set to test  process.env.NODE_ENV='test'
//Require the dev dependencies 

let chai = require('chai');
let chaiHTTP=require('chai-http'); 
let server= require('../index.js'); //let modules and the index.js file which allows chai access to the Express app
let should = chai.should();
chai.use(chaiHTTP); //tell chai to use the http module so it can comunicate with the server

//define the tests
describe('Test', function(){
    it('/Get index.html');
    it('/GET 404');
  it('/GET users');

    //create a test to ensure that html is loaded
    it ('it should get the index.html file', (done)=> {
        chai.request(server)
        .get('/index.html')
        .end((err,res)=>{
            res.should.have.status(200); //assertions: http status will be 200 and the content will be html
            res.should.be.html;
            done(); //done indicates that test is complete
        })
    }
    )
}
)
