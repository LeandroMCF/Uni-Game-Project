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

        var isDownload = decodedToken.IdDownload;

        if (isDownload) {
            getEvaluation(decodedToken.nameid)
        }
        else{
            console.log(false)
        }
    } 
    else {

        window.location.href = "../login/index.html";
    }
}

function getEvaluation(id) {
    console.log(id)

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:7033/api/Evaluation/'+id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        
        var jsonEv = JSON.parse(xhr.responseText)

        console.log(jsonEv)
        console.log(jsonEv.score.toString())
        console.log(jsonEv.description.toString())

        var score = document.getElementById("score");
        var description = document.getElementById("description");

        score.textContent = jsonEv.score.toString();
        description.textContent = jsonEv.description.toString();
    };
    xhr.onerror = function() {

        loading.style.display = "none"
        serverError.style.display = "block"
    };
    xhr.send();
}