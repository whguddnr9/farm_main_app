function request_state1_user1(){
    $.ajax({
        url:'/live-state',
        success: function jsonfunc(json) {
            // $('#user_state1_1').val('');
            console.log("table",json);

            var temp = json.temp;
            var humi = json.humi;
            var soil = json.soil_humi;

            sen_state = compare('state1_1',temp,humi,soil)
            console.log("state1_1:", sen_state)
            $('#state1_1').text("상태: "+sen_state)



            let state1 = document.getElementById('state1_1');

            setTimeout(request_state1_user1, 3000);

        },cache: false
    });
}
function request_state1_user2(){
    $.ajax({
        url:'/live-state2',
        success: function jsonfunc(json) {
            $('#user_state1_2').val('');
            console.log("table",json);

            var temp = json.temp;
            var humi = json.humi;
            var soil = json.soil_humi;

            sen_state = compare('state1_2',temp,humi,soil)
            console.log("state:", sen_state)
            $('#state1_2').text("상태: "+sen_state)



            let state1 = document.getElementById('state');

            setTimeout(request_state1_user2, 3000);

        },cache: false
    });
}

function compare(name,temp, humi, soil){
    if(temp == 0 && humi == 0 && soil == 0){
        $("#card_"+name).removeClass('bg-warning')
        $("#card_"+name).addClass('bg-primary')
        return '정상'
    }
    else{
        $("#card_"+name).removeClass('bg-primary')
        $("#card_"+name).addClass('bg-warning')
        return '비정상'
    }
}



$(document).ready(request_state1_user1())
$(document).ready(request_state1_user2())
