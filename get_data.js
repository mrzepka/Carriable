var btn = document.getElementById('getRequestButton');
btn.addEventListener('click', main, false);


function main () {
	//key is the dev id key, riot api and wmata api are the api's I'm trying to access.
	var key = '9910cbfe-cf9b-4c46-af93-8c75cb9b99a6';
	var summToSearch = 'ObeseNightmare';
	var region = 'na'
	var baseApi = 'https://na.api.pvp.net'
	var summApi = '/api/lol/' + region + '/v1.4/summoner/by-name/' + 
				summToSearch + '?api_key=';

	//Here are all the stats we'll need to calculate carriability
	var deaths = [];
	var assists = [];
	var wards = [];
	var wardsKilled = [];

	var totDeaths = 0;
	var totAssists = 0;
	var totWards = 0;
	var totWardsKilled = 0;

	var i;




	//Runs get request via JS, used to get the info needed
	function getHttp( theUrl ) {
		var xmlHttp = null;

		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false);
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}

	function getGameInfo( game ) {
		var currWardsPlaced = typeof game.wardPlaced === 'undefined' ? 0 : game.wardPlaced;
		var currVisionBought = typeof game.visionWardsBought === 'undefined' ? 0 : game.visionWardsBought;
		var currWardsKilled = typeof game.wardKilled === 'undefined' ? 0 : game.wardKilled;
		deaths.push(game.numDeaths);
		assists.push(game.assists);
		wards.push(currWardsPlaced + currVisionBought);
		wardsKilled.push(currWardsKilled);
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

	//Get info from last 10 games
	for (game in recentGames){
		var curr = recentGames[game].stats;
		getGameInfo( curr );
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

alert( "ready" );