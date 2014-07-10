function main() {
    //Set variables for use in get requests
    var key = ''; //insert your own key
    var summToSearch = document.getElementById("summoner").value; //insert your own summmoner name
	var region = document.getElementById("region").value.toLowerCase(); //insert your own region
	console.log(summToSearch + " " + typeof(region));

	var baseApi = 'https://na.api.pvp.net'
	var summApi = '/api/lol/' + region + '/v1.4/summoner/by-name/' + 
				summToSearch + '?api_key=';

	//Here are all the stats we'll need to calculate carriability
	var deaths = [], assists = [], wards = [], wardsKilled = [];
	var totDeaths = 0, totAssists = 0, totWards = 0, totWardsKilled = 0;
	var i;


	//Runs get request via JS, used to get the info needed
	function getHttp( theUrl ) {
		var xmlHttp = null;

		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false);
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}


		//take game information and populate table in html doc
	function populateTableRow( gameNum, dth, ast, wp, wk ) {
		document.getElementById('deathsG' + gameNum).innerHTML = dth;
		document.getElementById('assistsG' + gameNum).innerHTML = ast;
		document.getElementById('wpG' + gameNum).innerHTML = wp;
		document.getElementById('wkG' + gameNum).innerHTML = wk;

	}

	//gets the game data we need
	function getGameInfo( game, gameNum ) {
		var currWardsPlaced = typeof game.wardPlaced === 'undefined' ? 0 : game.wardPlaced;
		var currVisionBought = typeof game.visionWardsBought === 'undefined' ? 0 : game.visionWardsBought;
		var currWardsKilled = typeof game.wardKilled === 'undefined' ? 0 : game.wardKilled;
		var numDeaths = typeof game.numDeaths === 'undefined' ? 0 : game.numDeaths;
		var numAssists = typeof game.assists === 'undefined' ? 0 : game.assists;
		
		deaths.push(numDeaths);
		assists.push(numAssists);
		wards.push(currWardsPlaced + currVisionBought);
		wardsKilled.push(currWardsKilled);

		populateTableRow(gameNum, numDeaths, numAssists, currWardsPlaced+currVisionBought, 
			currWardsKilled);
		
		console.log('deaths: ' + game.numDeaths);
		console.log('assists: ' + game.assists);
		console.log('wards: ' + currWardsPlaced);
		console.log('wards killed: ' + currWardsKilled);
	}



	//response is the object returned, parsing the string value returned from getHttp
	var response = JSON.parse(getHttp( baseApi + summApi + key));
	var summoner = response[summToSearch.toLowerCase()];
	console.log(summoner['id']);

	//We need the summoners id to get the recent games.
	var gamesApi = '/api/lol/' + region + '/v1.3/game/by-summoner/' + 
	summoner['id'] + '/recent?api_key=';

	//Make call to get recent games
	var response = JSON.parse(getHttp( baseApi + gamesApi + key));
	var recentGames = response['games'];

	console.log(recentGames);

	var gameNumber = 1;

	//Get info from last 10 games
	for (game in recentGames){
		var curr = recentGames[game].stats;
		getGameInfo( curr, gameNumber );
	}

	//Calculate totals of last 10 games
	for (i = 0; i < 10; i += 1) {
		totDeaths += deaths[i];
		totAssists += assists[i];
		totWards += wards[i];
		totWardsKilled += wardsKilled[i];
	}

	var avgDeaths = totDeaths/10;
	var avgAssists = totAssists/10;
	var avgWards = totWards/10;
	var avgWardsKilled = totWardsKilled/10;

	console.log('avg deaths: ' + avgDeaths);
	console.log('avg assists: ' + avgAssists);
	console.log('avg wards: ' + avgWards);
	console.log('avg wards killed: ' + avgWardsKilled);




	console.log(response);

	console.log(typeof response);

};