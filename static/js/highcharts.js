var chart;
var chart2;

/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
//Temp 함수
function requestData_Temp() {
    $.ajax({
        url: '/live-data',
        success: function(point) {
            var series = chart.series[0],
                shift = series.data.length > 20; // shift if the series is
                                                 // longer than 20
            console.log(series)

            // add the point
            chart.series[0].addPoint(point, true, shift);

            // call it again after one second
            setTimeout(requestData_Temp, 3000);
        },
        cache: false
    });
}

function requestData_humi() {
    $.ajax({
        url: '/live-data2',
        success: function(point) {
            var series = chart.series[0],
                shift = series.data.length > 20; // shift if the series is
                                                 // longer than 20
            console.log(series)

            // add the point
            chart.series[0].addPoint(point, true, shift);

            // call it again after one second
            setTimeout(requestData_humi, 3000);
        },
        cache: false
    });
}

$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container',
            defaultSeriesType: 'spline',
            events: {
                load: requestData_Temp
            }
        },
        title: {
            text: 'Temperature sensor'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        series: [{
            name: 'Temperature',
            data: []
        }]
    });
});

$(document).ready(function() {
    chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container2',
            defaultSeriesType: 'spline',
            events: {
                load: requestData_humi
            }
        },
        title: {
            text: 'Humidity sensor'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        series: [{
            name: 'humidity',
            data: []
        }]
    });
});