function initDatePicker() {
	$('#start-date-div').datetimepicker({
		format:'Y-m-d H:i'
	});
	$('#end-date-div').datetimepicker({
		format:'Y-m-d H:i'
	});

	
	$('#start-date-div').val("2008-01-01 00:00");
	$('#end-date-div').val("2014-03-21 23:23");
	
}

function getDateFilterQuery() {

	var startDate = $('#start-date-div').val();
	var endDate = $('#end-date-div').val();

	startDate = startDate.replace(/ /,'T') + ":00Z";
	endDate = endDate.replace(/ /,'T') + ":59Z";

	var fq = "st_creationdate:[" + startDate + " TO " + endDate + "]";

	return fq;


}


