function populateResults(response) {
	console.log(response);

	if(response.hasOwnProperty('facet_counts')) {
		showFacets(response['facet_counts']['facet_fields']);
	}


	if(response.hasOwnProperty('clusters')) {
		//showClusters(response['clusters']);
	}


	
}


/*
	this will populate the facets list.
	the facet which is selected at present will not be refreshed....selected facet will be stored in APPDATA.selectedFacet
*/
function showFacets(data) {
	console.log(data);

	$.each(data,function(facetName,facetVals) {

		var label = APPDATA['facets'][facetName]['label'],
			valueHTMLTemplate = "";

		var headerHTMLTemplate = "<label class='facet-heading' facetname='" + facetName +"'>" + 
							   	label + " (" + (facetVals.length)/2 + ")" + 
							  "</label>";




		for(var n=0;n<facetVals.length;n=n+2) {
			var value = facetVals[n];
			var count =  facetVals[(n+1)];

			valueHTMLTemplate += "<li><label><input type='checkbox'>" + value + " (" + count + ")" +"</label></li>"
		}

		$('#facetvalues').append(
			headerHTMLTemplate + "<ul>" + valueHTMLTemplate + "</ul>"
		);

	});




}


function showClusters(data) {

	var valueHTMLTemplate = "";

	$.each(data,function(index,cluster) {

		var label = cluster['labels'][0];
		var score = cluster['score'];  //the health of that cluster
		var count = cluster['docs'].length; //number of docs in result set which belong to that cluster

		valueHTMLTemplate += "<li>" + 
								label +
								"[" + count + "]" +
								" ("+score+")" +
							 "</li>";

		
	});

	$('#clustervalues').html(valueHTMLTemplate);
}



function showDocs() {

}


function showResults() {

}

