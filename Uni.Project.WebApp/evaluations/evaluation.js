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