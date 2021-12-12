function request_state1(){
    $.ajax({
        url:'/live-state',
        success: function jsonfunc(json) {
            $('#state1').val('');
            console.log("table",json);

            var temp = json.temp;
            var humi = json.humi;
            var soil = json.soil_humi;

            sen_state = compare(temp,humi,soil)
            console.log("state:", sen_state)
            $('#state1').text("상태: "+sen_state)



            let state1 = document.getElementById('state');

            setTimeout(request_state1, 3000);

        },cache: false
    });
}

function compare(temp, humi, soil){
    if(temp == 0 && humi == 0 && soil == 0){
        $("#user_state1").removeClass('bg-primary')
        $("#user_state1").addClass('bg-primary')
        return '정상'
    }
    else{
        $("#user_state1").removeClass('bg-primary')
        $("#user_state1").addClass('bg-warning')
        return '비정상'
    }


}



$(document).ready(request_state1())