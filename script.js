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

// Update distance dynamically
setInterval(changeDistance, 5000);

function changeDistance(){
    let distance = document.getElementById("distance");
    let currentDistance = parseFloat(distance.innerHTML);
    
    // Simulate distance change (decrease by 0.1m then reset)
    if(currentDistance > 2.0){
        distance.innerHTML = (currentDistance - 0.1).toFixed(1) + " meters";
    } else {
        distance.innerHTML = "2.5 meters";
    }
}

// Complaint System
let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const complaintText = document.getElementById('complaintText').value;
    const complaintEmail = document.getElementById('complaintEmail').value;
    const timestamp = new Date().toLocaleString();
    
    const complaint = {
        id: Date.now(),
        text: complaintText,
        email: complaintEmail,
        date: timestamp
    };
    
    complaints.unshift(complaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    
    document.getElementById('complaintText').value = '';
    document.getElementById('complaintEmail').value = '';
    
    displayComplaints();
});

function displayComplaints() {
    const complaintsList = document.getElementById('complaintsList');
    
    if (complaints.length === 0) {
        complaintsList.innerHTML = '<p style="color: gray; font-size: 14px;">No complaints yet</p>';
        return;
    }
    
    complaintsList.innerHTML = '';
    
    complaints.forEach(complaint => {
        const complaintDiv = document.createElement('div');
        complaintDiv.className = 'complaint-item';
        complaintDiv.innerHTML = `
            <p class="complaint-date">${complaint.date}</p>
            <p class="complaint-text">${complaint.text}</p>
            <p class="complaint-email">${complaint.email || 'No email provided'}</p>
            <button class="delete-btn" onclick="deleteComplaint(${complaint.id})">Delete</button>
        `;
        complaintsList.appendChild(complaintDiv);
    });
}

function deleteComplaint(id) {
    complaints = complaints.filter(complaint => complaint.id !== id);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    displayComplaints();
}

// Display complaints on page load
displayComplaints();