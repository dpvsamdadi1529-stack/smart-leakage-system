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
        updateDistance("SAFE");

    }

    else{

        status.innerHTML = "LEAKAGE DETECTED";
        status.style.color = "red";
        updateDistance("LEAKAGE DETECTED");

    }

}

// Update distance based on leakage status
function updateDistance(leakageStatus){
    let distance = document.getElementById("distance");
    
    if(leakageStatus === "LEAKAGE DETECTED"){
        // When leakage is detected, show dynamic distance values
        let distances = ["1.2 meters", "1.5 meters", "2.0 meters", "2.3 meters"];
        let randomDistance = distances[Math.floor(Math.random() * distances.length)];
        distance.innerHTML = randomDistance;
        distance.style.color = "red";
    } else {
        // When safe, show no leakage or far distance
        distance.innerHTML = "No leakage detected";
        distance.style.color = "green";
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