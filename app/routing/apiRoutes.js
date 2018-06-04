// ===============================================================================
// LOAD DATA
// We are linking our routes to a "data" sources. 
// These data sources hold an array of information on friends, etc.
// ===============================================================================

var friends 		= require('../data/friends.js');
var path 			= require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.json(friends); // returns the JSON of friends array
	}); // end of app.get

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a survey... this data is then sent to the server...
	// Then the server saves the data to the friends array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){
		var newUser = req.body // this is the user that just submitted
		var results = [ ]; // empty array to hold comparison values among other users
		var difference = 0; // initialize difference variable
		var matchIndex=0; // initialize variable
		for (var i=0; i < friends.length; i++ ){ //iterates through all existing users
			difference = 0; //reset difference to 0 for next comparison loop
			for(var j=0; j <newUser.scores.length; j++){ //iterates through each question for comparison
				difference += Math.abs( parseInt(friends[i].scores[j])  - parseInt(newUser.scores[j]) ) // compares each score for comparison. Adds difference to cumulative total
			}; // end of 'j' for loop #2
			results.push(difference); // after all scores compared, final difference value pushed to array
		}; // end of 'i' for loop #1
		matchIndex = results.indexOf( Math.min(...results) ) ; // assign the INDEX of the min value in result array after it is filled
		var name = friends[matchIndex].name;
		var photo = friends[matchIndex].photo;
		res.json({name: name, photo: photo}); //return JSON with match info
		friends.push(newUser); //add (object) survey results of new user to friends array 
	}); //end of app.post
} // end of module.exports