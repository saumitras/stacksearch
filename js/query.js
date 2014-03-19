function querySolr() {

//	var params = getQueryParams();

	var q = getQueryParams()['q'];

	var params = {
		"q" :q,
		"rows" : 20,
		"fl" : "id,st_post,st_posttype,st_tags,st_comments,st_displayname",
		"clustering": true,
		"clustering.results":true,
		"carrot.title" : "st_post",
		"wt" : "json",
		"facet": true,
		"facet.limit":20000,
		"hl":true
	};
 
    $.ajax ({
        
        url : "http://localhost:8983/solr/collection1/stacksearch",
        type : 'GET',
       	//data : encodeURIComponent(JSON.stringify(params)),
        data : params,
        dataType : 'jsonp',
        jsonp: 'json.wrf',
        success : function(response) {
            populateResults(response);
        },
        error : function(response) {
            console.log(response);
        }
    });

}


function getQueryParams() {

	var params = {};

	//get search query text
	var searchtext = $('#querybox').val();
	if(searchtext == "") {
		searchtext = "data";
	}

	var facets = getSelectedFacets();

	var queryString = "st_post:(\"" + searchtext + "\")";

	params['q'] = queryString;

	return params;


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




