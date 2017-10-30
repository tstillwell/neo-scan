function loadData() {
		var $nasa_elem = $('#nasa-results');
		var $date = $("#date").val();
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
		  var $number_of_neos = neo_results.element_count;
		  var $results = "";
		  for (var i = 0; i < $number_of_neos; i++) {
			   $neo = neo_results.near_earth_objects[$date][i]
			   $result_list_item = "<tr class='neo-item'><td>";
			   $result_list_item += "<a href='" + $neo.nasa_jpl_url + "'>" + $neo.name + "</a></td>";
			   $result_list_item += "<td>" + $neo.estimated_diameter.meters.estimated_diameter_min + " meters </td>";
			   $result_list_item += "<td>" + $neo.estimated_diameter.meters.estimated_diameter_max + " meters </td>";
			   $result_list_item += "<td>" + $neo.close_approach_data[0].miss_distance.kilometers + " km </td>";
			   $result_list_item += "</tr>";
			   $results += $result_list_item;
			   }
		  $("#nasa_results").html($results);
		}).fail(function(err) {
		  var $error_msg = "<span>Nasa Data could not be loaded</span>";
		  $("#nasa_results").html($error_msg);
		  throw err;
		});
}
