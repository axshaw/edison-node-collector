// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME         ========
	// =====================================
	app.get('/', function(req, res) {
	  res.send();
	});





	// =====================================
	// authenitcation for web portal         ========
	// =====================================

	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

	// GET /auth/google
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Google authentication will involve redirecting
	//   the user to google.com.  After authenticating, Google will redirect the
	//   user back to this application at /auth/google/return
	app.get('/auth/google', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	// GET /auth/google/return
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/google/return', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });


	// 
	// LOGOUT
	// 
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});


	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});


	// =====================================
	// STATUS SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// status of connected edisons
	app.get('/status',function(req, res) {
	  res.render('status.ejs', {

	  });
	});

	// =====================================
	// API =====================
	// =====================================
	// recieve calls from edison and return only data

		app.get('/api', function(req, res){
			res.send(400,"Expecting data");
		});

		app.post('/api',function(req, res) {
			if (isNaN(req.body.edID))	{
				res.send(403,'Missing application ID (edison');	
			}else	{
				res.send(200);
			}

	});

};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}