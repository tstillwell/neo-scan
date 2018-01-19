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
        }).done(function(result){
			buildTable(result);
		}).fail(function(err) {
        var error_msg = "<span>Nasa Data could not be loaded</span>";
        $(".apierror").html(error_msg);
        throw err;
        });
}

function buildTable(result) {
		var date = $("#date").val();
	    var number_of_neos = result.element_count;
        var size_unit = meters_selected() ? 'meters' : 'feet';
        var distance_unit = km_selected() ? 'kilometers' : 'miles';
        var result_table = "<thead><tr><th>NEO Name</th><th id='min-dis-hdr'>";
		result_table += "Min Est. Diameter (" + size_unit + ")</th>";
        result_table += "<th id='max-dis-hdr'>Max Est. Diameter (" + size_unit;
		result_table += ")</th><th id='miss-dis-hdr'>Miss Distance (";
        result_table += distance_unit + ")</th></tr></thead><tbody>";
        for (var i = 0; i < number_of_neos; i++) { 
			// Build a table row for each NEO in response
            neo = result.near_earth_objects[date][i];
            table_row = "<tr class='neo-item'><td class='neo-name'>";
            table_row += "<a href='" + neo.nasa_jpl_url + "'>" + neo.name + "</a></td>";
            table_row += "<td> <span class='diameter-min' data-dmin-feet='";
            table_row += neo.estimated_diameter.feet.estimated_diameter_min.toFixed(2);
            table_row += "' data-dmin-meters='" + neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2) + "'>";
            table_row += neo.estimated_diameter[size_unit].estimated_diameter_min.toFixed(2) + "</span></td>";
            table_row += "<td>" + "<span class='diameter-max' data-dmax-feet='";
            table_row += neo.estimated_diameter.feet.estimated_diameter_max.toFixed(2);
            table_row += "' data-dmax-meters='" + neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2) + "'>";
            table_row += neo.estimated_diameter[size_unit].estimated_diameter_max.toFixed(2) + " </span></td>";
            table_row += "<td><span class='miss-distance' data-distance-miles='";
            table_row += Math.round(neo.close_approach_data[0].miss_distance.miles);
            table_row += "' data-distance-km='" + Math.round(neo.close_approach_data[0].miss_distance.kilometers);
            table_row += "'>" + Math.round(neo.close_approach_data[0].miss_distance[distance_unit]) + "</span></td>";
            table_row += "</tr>";
            result_table += table_row; // Add row to table html
            }
        result_table += "</tbody>";
        $("#nasa-results").html(result_table);
        $("#nasa-results").tablesorter({ theme: 'blue', widgets: ["zebra"] }).trigger('applyWidgets');
	}

function changeUnits() {  // reload units when 'confirm' change units clicked
        $min_distance_cells = $(".diameter-min");
        $max_distance_cells = $(".diameter-max");
        $miss_distance_cells = $(".miss-distance");
        if (meters_selected()){
            $min_distance_cells.each(function(index){
                $min_distance_cells[index].innerHTML = this.dataset["dminMeters"];
            });
            $max_distance_cells.each(function(index){
                $max_distance_cells[index].innerHTML = this.dataset["dmaxMeters"];
            });
            $("#min-dis-hdr").html("Min Est. Diameter (meters)");
            $("#max-dis-hdr").html("Max Est. Diameter (meters)");
        }
        else {
            $min_distance_cells.each(function(index){
                $min_distance_cells[index].innerHTML = this.dataset["dminFeet"];
            });
            $max_distance_cells.each(function(index){
                $max_distance_cells[index].innerHTML = this.dataset["dmaxFeet"];
            });
            $("#min-dis-hdr").html("Min Est. Diameter (feet)");
            $("#max-dis-hdr").html("Max Est. Diameter (feet)");
        }
        if (km_selected()){
            $miss_distance_cells.each(function(index){
                $miss_distance_cells[index].innerHTML = this.dataset["distanceKm"];
            });
            $("#miss-dis-hdr").html("Miss Distance (kilometers)");
        }
        else {
            $miss_distance_cells.each(function(index){
                $miss_distance_cells[index].innerHTML = this.dataset["distanceMiles"];
            });
            $("#miss-dis-hdr").html("Miss Distance (miles)");
        }
    }

function meters_selected() {  // true if meters is selected
        return document.querySelector('#radioMeters').checked;
    }

function km_selected() {  // true if km is selected
        return document.querySelector('#radioKM').checked;
    }

function todayDate() { // today's date in yyyy-mm-dd format
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if (dd<10) {
        dd = '0'+ dd;
    }
    if (mm<10) {
        mm = '0'+ mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
    }


$( "#date" ).datepicker();
$( "#date" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
document.querySelector("#submit-btn").addEventListener("click", loadData);
document.querySelector("#units-btn").addEventListener("click", changeUnits);
$("#date").val(todayDate());  // default date in field to today's date
$("#radioMeters").prop("checked", true);
$("#radioKM").prop("checked", true);