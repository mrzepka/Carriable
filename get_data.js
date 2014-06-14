$(document).ready(function() {
	
	//key is the dev id key, riot api and wmata api are the api's I'm trying to access.
	var key = 'c841951f-9130-4a73-8b15-86fac8e5fb49';
	var riot_api = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/ObeseNightmare?api_key=" + key;
	var wmata_api = "http://api.wmata.com/Rail.svc/json/jLines?api_key=kfgpmgvfgacx98de9q3xazww";
	
	
	alert( "ready" );
	
	//button onclick
	$( "#getInfo" ).submit(function(form){
	
	var summoner = form.summonerName.value;
	var region = form.region.value;
	
	alert( summoner +" , "+ region );
	
	//Get request via ajax
	var request = $.ajax({
		type: "GET",
		url: riot_api
	});
		
	//Once get request is finished, put all the objects and id's into the paragraph
	request.done(function(msg) {
			$.each(msg, function(idx, obj){
				console.log( obj );
				$.each(obj, function(i, o){
					
					//log things just because
					console.log(i + " : " + o);
					
					//actual append call
					$( "p" ).append( i+" : "+o+ '<br>' );
				});
			});
		
			//alert('done');
	});
	});
	
});