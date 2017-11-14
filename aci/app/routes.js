/**
 * This file defines the routes used in your application
 * It requires the database module that we wrote previously.
 */ 

var Lookup = require('./pip');
var db = require('./database'),
	photos = db.photos,
	users = db.users;

module.exports = function(app){
       	console.log("=> We are in the game...");
	flag = 0;
	ipv4 = "";

	// Find out our Public IP
	Lookup.GetMyPublicIP(function(status_code, response) {
       		console.log("Metadata Service Response Status:", status_code);
		if (status_code == 200) {
			if (response != "") {
				ipv4 = response;
       				console.log("Metadata Service Response Body:", ipv4);
			}
		}

		// Homepage
		app.get('/', function(req, res){
			if (ipv4 == "" && flag == 0) {
				ipv4 = JSON.stringify(req.headers.host).replace(/['"]+/g, '');
       				console.log("Getting Public IP From HTTP Request Header:", ipv4);
				flag = 1;
			}
			// Find all photos
			photos.find({}, function(err, all_photos){

				// Find the current user
				users.find({ip: req.ip}, function(err, u){

						var voted_on = [];

						if(u.length == 1){
							//To enable the control of one vote per IP, just uncomment the next line...
							//voted_on = u[0].votes;
						}

						// Find which photos the user hasn't still voted on
						var not_voted_on = all_photos.filter(function(photo){
							return voted_on.indexOf(photo._id) == -1;
						});

						var image_to_show = null;

						if(not_voted_on.length > 0){
							// Choose a random image from the array
							image_to_show = not_voted_on[Math.floor(Math.random()*not_voted_on.length)];
						}
						// Render the home template and pass the photo
						res.render('home', { photo: image_to_show, ip: ipv4 });
					//});

				});

			});

		});

		app.get('/standings', function(req, res){

			photos.find({}, function(err, all_photos){

				// Sort the photos 

				all_photos.sort(function(p1, p2){
					return (p2.likes - p2.dislikes) - (p1.likes - p1.dislikes);
				});

				// Render the standings template and pass the photo
				res.render('standings', { standings: all_photos, ip: ipv4 });

			});

		});

		// This is executed before the next two post requests
		app.post('*', function(req, res, next){
		
			// Register the user in the database by ip address

			users.insert({
				ip: req.ip,
				votes: []
			}, function(){
				// Continue with the other routes
				next();
			});
		
		});

		app.post('/notcute', vote);
		app.post('/cute', vote);

		function vote(req, res){

			// Which field to increment, depending on the path

			var what = {
				'/notcute': {dislikes:1},
				'/cute': {likes:1}
			};

			// Find the photo, increment the vote counter and mark that the user has voted on it.

			photos.find({ name: req.body.photo }, function(err, found){

				if(found.length == 1){

					photos.update(found[0], {$inc : what[req.path]});

					users.update({ip: req.ip}, { $addToSet: { votes: found[0]._id}}, function(){
						res.redirect('../');
					});

				}
				else{
					res.redirect('../');
				}

			});
		}
	//Lookup
	})
};
