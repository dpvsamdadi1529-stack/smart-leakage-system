function changePump(){

    let button = document.querySelector("button");

    if(button.innerHTML == "TURN PUMP OFF"){
        button.innerHTML = "TURN PUMP ON";
    }

    else{
        button.innerHTML = "TURN PUMP OFF";
    }

}

setInterval(changeStatus, 3000);

function changeStatus(){

    let status = document.getElementById("status");

    if(status.innerHTML == "LEAKAGE DETECTED"){

        status.innerHTML = "SAFE";
        status.style.color = "green";

    }

    else{

        status.innerHTML = "LEAKAGE DETECTED";
        status.style.color = "red";

    }

}