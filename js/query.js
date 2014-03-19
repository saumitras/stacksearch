function querySolr() {

//	var params = getQueryParams();
	var params = {
		"q" :'st_post:data',
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