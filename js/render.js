function populateResults(response) {
	console.log(response);

	var qTime = response['responseHeader']['QTime'] + " ms";
	var numFound = response['response']['numFound'];


	if(APPDATA.searchSource != "pagination") {
		initPagination({itemsCount:numFound});
	}

	$('#status-message').html(numFound + " matches(" + qTime +")");

	if(response.hasOwnProperty('facet_counts')) {
		showFacets(response['facet_counts']['facet_fields']);
	}

	if(response.hasOwnProperty('clusters')) {
		showClusters(response['clusters']);
	}

	if(response.hasOwnProperty('highlighting') && response.hasOwnProperty('response')) {

		showDocs({
			highlighting: response['highlighting'],
			docs: response['response']['docs']
		});
	}
 
}


/*
	this will populate the facets list.
	the facet which is selected at present will not be refreshed....selected facet will be stored in APPDATA.selectedFacet
*/
function showFacets(data) {
	//console.log(data);


	$('#facetvalues').html("");

	$.each(data,function(facetName,facetVals) {

		var label = APPDATA['facets'][facetName]['label'],
			valueHTMLTemplate = "";

		var headerHTMLTemplate = "<label class='facet-heading' facetname='" + facetName +"'>" + 
							   	label + " (" + (facetVals.length)/2 + ")" + 
							  "</label>";


		for(var n=0;n<facetVals.length;n=n+2) {
			var value = facetVals[n];
			var count =  facetVals[(n+1)];

			valueHTMLTemplate += "<li><label value='" + value + "'>" +
										"<input type='checkbox'>" + value + " (" + count + ")" +
								  "</label></li>";
		}

		$('#facetvalues').append(
			headerHTMLTemplate + "<ul facetname='" + facetName +"'>" + valueHTMLTemplate + "</ul>"
		);

	});

	onFacetSelection();

}

function onFacetSelection() {

	$('#facetvalues').find(':checkbox').change(function() {

		var data = {
			'parent': $(this).parent().parent().parent().attr('facetname'),
			'value' : $(this).parent().attr('value')	
		}

		if($(this).is(':checked')) {
			
			//add the facet on the filter bar
			addNewFacet(data);

		} else {
			//remove the facet from the filter bar
			removeFacet(data);

		}

		

	});
	

}


/* add the selected facet on the filter bar */
function addNewFacet(data) {

	console.log(data);

	var facetName = data.parent;
	var value = data.value;

	var filterHTMLTemplate = "<span class='filter' value='" + value + "' facetname='" + facetName + "'>" + 
								value + 
								"<img src='img/close1.png' /> |" +
							 "</span>";


	$('#filter-bar').append(filterHTMLTemplate);

	APPDATA.searchSource = "facetAdded";
	startSearch();



	//define the on-close-icon-click event handler
	$('#filter-bar').find('span').last().find('img').click(function() {
		var facetname = $(this).parent().attr('facetname');
		var value = $(this).parent().attr('value');

		$('#facetvalues ul').filter("[facetname='" + facetname + "']").find("[value='" + value + "']").find(':checkbox').removeAttr('checked');
		$(this).parent().remove();

		APPDATA.searchSource = "facetRemovedByIconClick";
		startSearch();

	});

}


function removeFacet(data) {

	var facetName = data.parent;
	var value = data.value;

	$('#filter-bar').find("[facetname='"+ facetName + "']").filter("[value='" + value +"']").remove();

	APPDATA.searchSource = "facetRemovedFromCheckbox";
	startSearch();

}

function showClusters(data) {

	var valueHTMLTemplate = "";

	$.each(data,function(index,cluster) {

		var label = cluster['labels'][0];
		var score = cluster['score'];  //the health of that cluster
		var count = cluster['docs'].length; //number of docs in result set which belong to that cluster

		valueHTMLTemplate += "<li>" + 
								"<b>" + label + "</b> " +
								"[" + count + " docs]" +
								" ("+ score.toFixed(2) +")" +
							 "</li>";

		
	});

	$('#clustervalues').html(valueHTMLTemplate);
}


function showDocs(data) {

	var highlighting = data['highlighting'];
	var docs = data['docs'];


	$('#result-list').html("");
	for(var n=0;n<docs.length;n++) {

		
		var id = docs[n]['id'];
		var postType = docs[n]['st_posttype'];
		var username = docs[n]['st_displayname'];
		
		var docHTMLTemplate = "<div class='result-header'>" +
									"<span class='colname-style1'>Type:</span><span class='value-style1'>"+ postType + "</span>" +
									"<span class='colname-style1'>Username:</span> <span class='value-style1'>"+ username + "</span>" +
					    	   "</div>";


		var post = highlighting[id]['st_post'][0];

		docHTMLTemplate += "<div class='result-content'>" + post + "</div>";

		var comments = docs[n]['st_comments'];
		
		//comments may not be present in every document		
		if(comments != undefined) {
			docHTMLTemplate += "<div class='comments'>";
			$.each(comments,function(index,comment) {
				docHTMLTemplate += "<li>" + comment + "</li>";
			});
			docHTMLTemplate += "</div>";
		}

  		docHTMLTemplate = "<div class='result'>" + docHTMLTemplate + "</div>";


  		$('#result-list').append(docHTMLTemplate);

	}


	$('.result-header').bind('dblclick',function() {
		$(this).siblings().slideToggle('fast');
	});

}


