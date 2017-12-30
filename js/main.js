function loadData() { // retrieve data from API and build table
		var date = $("#date").val();
		var nasa_api_url = "https://api.nasa.gov/neo/rest/v1/feed?";
		nasa_api_url += $.param({
				  'start_date' : date,
				  'end_date' : date,
				  'api_key' : 'DEMO_KEY'  // NASA API key get one from api.nasa.gov
			});
		// console.log(nasa_api_url);
		$.ajax({
		  url: nasa_api_url,
		  method: 'GET',
		}).done(function(result) {
		  var number_of_neos = result.element_count;
		  var size_unit = meters_selected() ? 'meters' : 'feet';
		  var distance_unit = km_selected() ? 'kilometers' : 'miles';
		  var result_table = "<thead><tr><th>NEO Name</th><th>Min Est. Diameter (" + size_unit + ")</th>";
		  result_table += "<th>Max Est. Diameter (" + size_unit + ")</th><th>Miss Distance (" + distance_unit + ")</th></tr></thead><tbody>";
		  for (var i = 0; i < number_of_neos; i++) { // Add a row to table for each NEO in response
			   neo = result.near_earth_objects[date][i];
			   result_list_item = "<tr class='neo-item'><td class='neo-name'>";
			   result_list_item += "<a href='" + neo.nasa_jpl_url + "'>" + neo.name + "</a></td>";
			   result_list_item += "<td>" + "<span class='diameter-min'>";
			   result_list_item += neo.estimated_diameter[size_unit].estimated_diameter_min.toFixed(2) + "</span></td>";
			   result_list_item += "<td>" + neo.estimated_diameter[size_unit].estimated_diameter_max.toFixed(2) + " </td>";
			   result_list_item += "<td><span class='miss-distance' data-distance-miles='" + Math.round(neo.close_approach_data[0].miss_distance.miles);
			   result_list_item += "' data-distance-km='" + Math.round(neo.close_approach_data[0].miss_distance.kilometers);
			   result_list_item += "'>" + Math.round(neo.close_approach_data[0].miss_distance[distance_unit]) + "</span></td>";
			   result_list_item += "</tr>";
			   result_table += result_list_item;
			   }
		  result_table += "</tbody>";
		  $("#nasa-results").html(result_table);
		  $("#nasa-results").tablesorter({ theme: 'blue', widgets: ["zebra"] }).trigger('applyWidgets');
		}).fail(function(err) {
		  var error_msg = "<span>Nasa Data could not be loaded</span>";
		  $(".apierror").html(error_msg);
		  throw err;
		});
}

function changeUnits() {
		loadData();
	}
	
function meters_selected() {  // return true if meters is selected size unit
		return document.querySelector('#radioMeters').checked;
	}

function km_selected() {  // return true if km is selected distance unit
		return document.querySelector('#radioKM').checked;
	}

document.querySelector("#submit-btn").addEventListener("click", loadData);
document.querySelector("#units-btn").addEventListener("click", changeUnits);


function todayDate() { // return today's date in yyyy-mm-dd format
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+ dd;
	}

	if(mm<10) {
		mm = '0'+ mm;
	}
	today = yyyy + '-' + mm + '-' + dd;
	return today;
	}

$("#date").val(todayDate());
$("#radioMeters").prop("checked", true);
$("#radioKM").prop("checked", true);