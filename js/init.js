$(document).ready(function() {
	$('#start-date-div').datetimepicker();
	$('#end-date-div').datetimepicker();
	
	$('.searchicon').click(function(){
		querySolr();
	});

	$('#querybox').bind('keyup', function(e){
		if(e.keyCode == 13) {
			startSearch();
		}
	});

	initAutoComplete();
	initPagination();

	startSearch();

});

function initAutoComplete() {
	
	$("#querybox").autocomplete({data: [
		['apple', 1],
		['apricot', 2],
		['apple my' , 3],
		['apple 4', 4],
		['apple shake', 5]
		],
		mustMatch: false,
		maxItemsToShow: 5,
		selectFirst: false,
		autoFill: false,
		selectOnly: true
	});

}


function initPagination() {
	$('#pagination').pagination({
		items: 100,
		itemsOnPage: 10,
		cssStyle: 'light-theme'
	});

}


function startSearch() {
	querySolr();
}