var chart;

var chartOptions =  {
    credits: false,
    //colors: ["#666666"],
    colors: ["#43C7BC"],
    
    chart: {
        renderTo: 'chartDiv',
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            align: 'right',
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        //pointFormat: 'Results: <b>{point.y:.1f} docs</b>'
        pointFormat: '<b>{point.y} docs</b>'
    },
    dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        x: 4,
        y: 10,
        style: {
            fontSize: '11px',
            fontFamily: 'Verdana, sans-serif',
            textShadow: '0 0 3px black'
        }
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function() {
                        alert ('Name: '+ this.name +', value: '+ this.y);
                    }
                }
            }
        }
    },
    series: [{
        name: 'Results',
        data: [
            /*['Mexico City', 8.9],
            ['Lima', 8.9]*/
        ]

    }]
}



function initChart() {

    chart = new Highcharts.Chart(chartOptions);
}



var graphData = [];

function populateChart(params) {
    
    
    chart.hideLoading();
    
    var gap = params['gap'];

    var solrData = params['counts'];
    console.log(solrData);

    if(solrData.length == 0) {
        //TODO - clear the graph
        return;
    }

    var dates = getPluginDates();

    graphData= [];


    var tempHash = {};

    if(gap.match(/YEAR/)) {

        var startYear = dates.start.year;
        var endYear = dates.end.year;

        while(startYear<=endYear) {
            tempHash[startYear.toString()]  = 0;
            startYear++;
        }

        
        for(var i=0;i<solrData.length;i=i+2){
            var value = solrData[i];
            var year = value.replace(/\-.*/,'');
            var count = solrData[i+1];
        
            tempHash[year.toString()] = count;


        }

        graphData = hashToArray(tempHash);
    }


    chart.series[0].setData(graphData,true);

}


function hashToArray(tempHash) {
    var arr = [];
    $.each(tempHash,function(key,value) {
        arr.push([key,+value]);
    });
    return arr;
}

function getPluginDates() {

    var dates = {};
    var startDate = $('#start-date-div').val();
    var endDate = $('#end-date-div').val();

    var comp = startDate.match(/(\d+)\-(\d+)-(\d+) (\d+):(\d+)/);

    dates['start'] = {
        year: comp[1],
        month: comp[2],
        day: comp[3],
        hour: comp[4],
        min: comp[5],
        sec: "00",
        fullDate: startDate,
        solrDate: startDate.replace(/\s/,'T') + ':00Z'
    }


    comp = endDate.match(/(\d+)\-(\d+)-(\d+) (\d+):(\d+)/);

    dates['end'] = {
        year: comp[1],
        month: comp[2],
        day: comp[3],
        hour: comp[4],
        min: comp[5],
        sec: "59",
        fullDate: endDate,
        solrDate: endDate.replace(/\s/,'T') + ':59Z'
    }

    return dates;
}



function graphOnClick(params) {
    var gap = params.gap;
    var label = params.label;

}