console.log("loaded script");

function loadData() {
	var $body = $('body');
	console.log($body);
	console.log("loading data...");
	var $date = $("#date").val();
	console.log($date);

	var nasa_api_url = "https://api.nasa.gov/neo/rest/v1/feed";
	nasa_api_url += $.param({
		  'start_date' : $date,
		  'end_date' : $date,
		  'api_key' : 'DEMO_KEY',
		});

	console.log(nasa_api_url);
	$.ajax({
		  url: nasa_api_url,
		  method: 'GET',
		}).done(function(result) {
		  var neo_objects = result;
		  console.log(neo_objects);
		  var $number_of_neos = $neo_objects.response.element_count;
		  var $results = ""
		  for (var i = 0; i < $number_of_neos; i++) {
			   $result_list_item = "<li class='object'>" + ($neo_objects.response.near_earth_objects.$date[i]) + "</li>";
			   $results += $result_list_item;
			   }
		  $("#nasa-results").html($articles);
		}).fail(function(err) {
		  var $error_msg = "<span>Nasa Data could not be loaded</span>";
		  $("#nasa-results").html($error_msg);
		  throw err;
		});
}

$('#form-container').submit(loadData);

console.log("finished script");