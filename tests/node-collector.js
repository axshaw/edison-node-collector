
var should    = require('should');
var request   = require('supertest');
var collector = require('../web.js');



describe('Get /', function(){

	it('should respond true if tests are working',function(){
		(5).should.be.exactly(5).and.be.a.Number;
	})

	it('should return status 200',function(done){
		request(collector)
        .get('/')
        .expect(200)
        .end(function(err, res) { // .end handles the response
            if (err) {
                return done(err);
            }

            done();
        });
	})

});

describe('Get web admin pages', function(){

	it('should return 200 on the status page',function(done){
		request(collector)
        .get('/status')
        .expect(200)
        .end(function(err, res) { // .end handles the response
            if (err) {
                return done(err);
            }

            done();
        });
	})

	it('should return 404 for pages not found',function(done){
		request(collector)
        .get('/idonthavethispage')
        .expect(404)
        .end(function(err, res) { // .end handles the response
            if (err) {
                return done(err);
            }

            done();
        });
	})

	


	
});

describe('api queries using get and post',function(){
	it('should return 400 bad request if page it hit with get request', function(done){
		request(collector)
		.get('/api')
		.expect(400)
		.end(function(err,res){
			if(err){
				return done(err);
			}
			done();
		})
	})



	it('should return 403 missing ID if no edison ID number is passed ', function(done){
		request(collector)
		.post('/api')
		.send({
			'name' : 00004
		}) 
		.expect(403)
		.end(function(err,res){
			if(err){
				return done(err);
			}
			done();
		})
	})

	it('should return 403 if malformed edison ID number is passed ', function(done){
		request(collector)
		.post('/api')
		.send({
			'edID' : 'hello'
		})
		.expect(403)
		.end(function(err,res){
			if(err){
				return done(err);
			}
			done();
		})
	})

	it('should return 200 if edison ID number is passed ', function(done){
		request(collector)
		.post('/api')
		.send({
			'edID' : 00001
		})
		.expect(200)
		.end(function(err,res){
			if(err){
				return done(err);
			}
			done();
		})
	})
});



