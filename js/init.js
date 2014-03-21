$(document).ready(function() {
	
	onLoadBindings();

	initDatePicker();
	initAutoComplete();
	initPagination({itemsCount:0});

	startSearch();

});


function onLoadBindings() {
	$('.searchicon').click(function(){
		APPDATA.searchSource = "searchiconclick";
		startSearch();
	});

	$('#rows').change(function(){
		APPDATA.searchSource = "rowsChange";
		startSearch();
	});

	$('#sort').change(function(){
		APPDATA.searchSource = "sortChange";
		startSearch();
	});


	$('#querybox').bind('keyup', function(e){
		if(e.keyCode == 13) {
			APPDATA.searchSource = "queryboxKeyup";
			startSearch();
		}
	});


	$('#clusters').find('.clusterheading').bind('dblclick',function() {
		$('#clustervalues').slideToggle('fast');
	});

}

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


function initPagination(data) {

	if(data.pageNumber == undefined) {
		data.pageNumber = 1;
	}

	$('#pagination').pagination({
		items: data.itemsCount,
		itemsOnPage: $('#rows').val(),
		currentPage : data.pageNumber,
		cssStyle: 'light-theme'
		
	});


}


function startSearch(args) {
/*
	if(args == undefined) {
		initPagination({itemsCount:0});
	}*/

	querySolr();
}