$(document).ready(function() {
	$('#start-date-div').datetimepicker();
	$('#end-date-div').datetimepicker();
	

	initAutoComplete();
	initPagination();

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