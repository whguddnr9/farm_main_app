function requestAll(){
    $.ajax({
        url:'/live-table-all',
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