
function querySolr() {

//	var params = getQueryParams();

	$('#status-message').html("Searching...");

	var q = getQueryParams()['q'];
	var rows = $('#rows').val();
	var sort = $('#sort').val();

	var start = ($('#pagination').pagination('getCurrentPage') - 1) * $('#rows').val();
	var fq = getDateFilterQuery();

	var params = {
		"q" :q,
		"rows" : rows,
		"fl" : "id,st_post,st_posttype,st_tags,st_comments,st_displayname",
		"fq" : fq,
		"clustering": true,
		"clustering.results":true,
		"carrot.title" : "st_post",
		"wt" : "json",
		"facet": true,
		"facet.limit":20000,
		"hl":true,
		"sort":sort,
		"start":start,
		"defType":"edismax"
	};
 
    $.ajax ({
        
        url : "http://" + APPDATA.SOLR_HOST + ":" + APPDATA.SOLR_PORT + "/solr/collection1/stacksearch",
        type : 'GET',
       	//data : encodeURIComponent(JSON.stringify(params)),
        data : params,
        dataType : 'jsonp',
        jsonp: 'json.wrf',
        success : function(response) {
            populateResults(response);
            console.log("success");
        },
        error : function() {
        	console.log("fail");
        	$('#status-message').html("Unable to fetch query results.")
            //console.log(response);
         
        }
    });

}


function getQueryParams() {

	var params = {};

	//get search query text
	var searchtext = $('#querybox').val();
	if(searchtext == "") {
		queryString = "st_post:(*)";
	} else {
		queryString = "st_post:(\"" + searchtext + "\")";
	}

	
	//var queryString = "st_post:(\"" + searchtext + "\")";

	var facetQueryString = getFacetQueryString();
	if(facetQueryString != "") {
		queryString += " AND " + facetQueryString;
	}

	params['q'] = queryString;

	return params;


}

function getFacetQueryString() {
	
	var tempArray = [];
	
	$.each((getSelectedFacets()),function(facetName,valueArray) {
		 var str = facetName + ":(\"" + valueArray.join('" OR "') + "\")"
		 tempArray.push(str);
	});

	return tempArray.join(' AND ');

}

function getSelectedFacets() {

	var facets = {};
	$('#filter-bar span').each(function() {
		
		var facetName = $(this).attr('facetname');
		var value = $(this).attr('value');

		if(facets.hasOwnProperty(facetName)) {
			facets[facetName].push(value);
		} else {
			facets[facetName] = [value];
		}

	});

	return facets;
}




function showMoreLikeThis() {




}