function loadData() {
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
		  var $results = "<thead><tr><th>NEO Name</th><th>Min Est. Diameter (meters)</th><th>Max Est. Diameter (meters)</th><th>Miss Distance (km)</th></tr></thead><tbody>";
		  for (var i = 0; i < $number_of_neos; i++) {
			   $neo = neo_results.near_earth_objects[$date][i]
			   $result_list_item = "<tr class='neo-item'><td>";
			   $result_list_item += "<a href='" + $neo.nasa_jpl_url + "'>" + $neo.name + "</a></td>";
			   $result_list_item += "<td>" + $neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2) + "</td>";
			   $result_list_item += "<td>" + $neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2) + " </td>";
			   $result_list_item += "<td>" + Math.round($neo.close_approach_data[0].miss_distance.kilometers) + " </td>";
			   $result_list_item += "</tr>";
			   $results += $result_list_item;
			   }
		  $results += "</tbody>";
		  $("#nasa_results").html($results);
		  $("#nasa_results").tablesorter();
		}).fail(function(err) {
		  var $error_msg = "<span>Nasa Data could not be loaded</span>";
		  $("#nasa_results").html($error_msg);
		  throw err;
		});
}
