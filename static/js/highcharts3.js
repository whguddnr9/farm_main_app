var chart;
var chart2;
var chart3;
/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */


function requestTemp() {
    $.ajax({
        url: '/live-data4',
        success: function(point) {
            var series = chart.series[0],
                shift = series.data.length > 20; // shift if the series is
                                                 // longer than 20

            console.log("length",Object.keys(point).length)
            console.log("printPoint",point)
            // console.log("temp:",point.temperature)
            var time = point.meta_time;
            var temp = [time,point.temperature]

            // add the point
            chart.series[0].addPoint(temp, true, shift);

            // call it again after one second
            setTimeout(requestTemp, 3000);
        },
        cache: false
    });
}

function requestHumi() {
    $.ajax({
        url: '/live-data4',
        success: function(point) {
            var series = chart2.series[0],
                shift = series.data.length > 20; // shift if the series is
                                                 // longer than 20

            console.log("length",Object.keys(point).length)
            console.log("printPoint",point)
            // console.log("temp:",point.temperature)
            var time = point.meta_time;
            var humi = [time,point.humidity]

            // add the point
            chart2.series[0].addPoint(humi, true, shift);

            // call it again after one second
            setTimeout(requestHumi, 3000);
        },
        cache: false
    });
}

function requestSoil() {
    $.ajax({
        url: '/live-data4',
        success: function(point) {
            var series = chart3.series[0],
                shift = series.data.length > 20; // shift if the series is
                                                 // longer than 20

            console.log("length",Object.keys(point).length)
            console.log("printPoint",point)
            // console.log("temp:",point.temperature)
            var time = point.meta_time;
            var soil = [time,point.soil_humidity]

            // add the point
            chart3.series[0].addPoint(soil, true, shift);

            // call it again after one second
            setTimeout(requestSoil, 3000);
        },
        cache: false
    });
}

//시간 변수 초기화 해야함
const timezone = new Date().getTimezoneOffset()

Highcharts.setOptions({
    global: {
        timezoneOffset: timezone
    }
});


function requestAll(){
    $.ajax({
        url:'/live-table',
        success: function jsonfunc(json) {
            $('#btable').empty();
            console.log("table",json);
            let arrDate = new Array();
            let arrTemp = new Array();
            let arrHumi = new Array();
            let arrSoil = new Array();

            // let json = JSON.parse(jsonText.toString());

            for(i=0; i<json.length; i++){ // 값 전체 가져오는법
                arrDate[i] = json[i].dateTime;
                arrTemp[i] = json[i].temperature;
                arrHumi[i] = json[i].humidity;
                arrSoil[i] = json[i].soil_humidity;

            }
            let table = document.getElementById('btable');

            for(i=0; i<arrDate.length; i++){
                let tr = document.createElement("tr");

                let td1 = document.createElement("td");
                td1.appendChild(document.createTextNode(arrDate[i] + ""));

                let td2 = document.createElement("td");
                td2.appendChild(document.createTextNode(arrTemp[i] + ""));

                let td3 = document.createElement("td");
                td3.appendChild(document.createTextNode(arrHumi[i]+ ""));

                let td4 = document.createElement("td");
                td4.appendChild(document.createTextNode(arrSoil[i]+ ""));

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);

                table.appendChild(tr);
            }

            setTimeout(requestAll, 3000);

        },cache: false
    });
}


$(document).ready(requestAll())
//그래프 그리는 함수
$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container',
            defaultSeriesType: 'spline',
            events: {
                load: requestTemp
            }
        },
        title: {
            text: 'Temperature'
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
                text: 'Temperature',
                margin: 80
            }
        },
        series: [{
            name: 'Temperature',
            data: []
        }]

    });

    chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container2',
            defaultSeriesType: 'spline',
            events: {
                load: requestHumi
            }
        },
        title: {
            text: 'Humidity'
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
                text: 'Humidity',
                margin: 80
            }
        },
        series: [{
            name: 'Humidity',
            data: []
        }]
    });

    chart3 = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container3',
            defaultSeriesType: 'spline',
            events: {
                load: requestSoil
            }
        },
        title: {
            text: 'Soil Humidity'
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
                text: 'SoilHumidity',
                margin: 80
            }
        },
        series: [{
            name: 'SoilHumidity',
            data: []
        }]

    });
});
