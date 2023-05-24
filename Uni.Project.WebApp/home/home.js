function decodeJwtToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function mount() {
    // Obter token do Local Storage
    var token = localStorage.getItem('token');

    if (token) {

        var decodedToken = decodeJwtToken(token);

        var userName = document.getElementById('userName');
        
        userName.textContent = decodedToken.unique_name;
    } 
    else {

        window.location.href = "../login/index.html";
    }
}

function download() {
    // Obter token do Local Storage
    var token = localStorage.getItem('token');

    var decodedToken = decodeJwtToken(token);

    var userId = decodedToken.nameid;
    
    console.log(userId)

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://localhost:7033/api/User/download/'+userId);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            if (xhr.responseText == 'user-updated' || xhr.responseText == 'user-downloaded') {
                
                window.location.href = "https://drive.google.com/drive/u/0/";
            }
            else{
                console.log("ERR")
            }
        } 
        else {
            console.log("ERR")
        }
    };
    xhr.onerror = function() {

        loading.style.display = "none"
        serverError.style.display = "block"
    };
    xhr.send();
        
}



function goEvaluations() {
    window.location.href = "../evaluations/evaluation.html"
  }