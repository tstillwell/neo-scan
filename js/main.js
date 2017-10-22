console.log("loaded script");

function loadData() {
var $nasa_elem = $('#nasa-results');
		console.log("loading data...");
		var $date = $("#date").val();
		console.log($date);
		var nasa_api_url = "https://api.nasa.gov/neo/rest/v1/feed?";
		nasa_api_url += $.param({
				  'start_date' : $date,
				  'end_date' : $date,
				  'api_key' : 'DEMO_KEY'
			});
		console.log(nasa_api_url);
		$.ajax({
		  url: nasa_api_url,
		  method: 'GET',
		}).done(function(result) {
		  var neo_results = result;
		  console.log(neo_results);
		  var $number_of_neos = neo_results.element_count;
		  var $results = "";
		  for (var i = 0; i < $number_of_neos; i++) {
			   console.log(neo_objects.near_earth_objects.$date.i);
			   $result_list_item = "<li class='object'>" + (neo_objects.near_earth_objects.$date.i) + "</li>";
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