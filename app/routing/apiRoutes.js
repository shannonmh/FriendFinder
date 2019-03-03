//var friendArray = require("../data/friends");
var friendArray = require("./../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendArray);
  });


  app.post("/api/friends", function(req, res) {
    
    var bestMatch = {
        name: '',
        photo: '',
        difference: 50
    }

    var userData = req.body;
    //var userName 	= userData.name;
	//var userPhoto 	= userData.photo;
	var userScores 	= userData.scores;
    var totalDifference = 0;

    //console.log("User Data: " + req.body);
    console.log("Scores: " + req.body.scores);


    for (var i = 0; i < friendArray.length; i++) {
        var possibleFriend = friendArray[i];
        totalDifference = 0;

        //console.log("Possible Friend Data: " + possibleFriend);

        for (var j = 0; j < possibleFriend.scores.length; j++) {
            var friendScore = possibleFriend.scores[j];
            //var userScore = userData.scores[j];

            totalDifference += Math.abs(parseInt(friendScore) - parseInt(userScores));
        }
        console.log(totalDifference)
        console.log(possibleFriend.name);
        console.log("Friend Score: " + friendScore);
        console.log("User Score: " + userScores);

        if (totalDifference <= bestMatch.difference) {
            bestMatch.name = possibleFriend.name;
            bestMatch.photo = possibleFriend.photo;
            bestMatch.difference = totalDifference;

            //console.log("Best Match: " + bestMatch);
        }
        
    }
    
    console.log(bestMatch);

    friendArray.push(userData);

    return res.json(bestMatch);
    
})
};
