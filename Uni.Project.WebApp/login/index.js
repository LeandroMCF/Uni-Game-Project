function clean(){
  localStorage.clear()
}

function login() {
    let xhr = new XMLHttpRequest();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    var emailError = document.getElementById("emailError")
    var serverError = document.getElementById("serverError")
    var loading = document.getElementById("loading")

    loading.style.display = "block"
    emailError.style.display = "none"
    serverError.style.display = "none"

    xhr.open('POST', 'https://localhost:7033/api/User/login/'+ email +"/"+ password);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        
        if (xhr.responseText == 'userError') {
          
          loading.style.display = "none"
          emailError.style.display = "block"
        }
        else if (xhr.responseText == 'serverError') {
          
          loading.style.display = "none"
          serverError.style.display = "block"
        }
        else{

          loading.style.display = "none"
          localStorage.setItem('token', xhr.responseText)
          window.location.href = "../home.html";
        }
      } 
      else {

        loading.style.display = "none"
        serverError.style.display = "block"
      }
    };
    xhr.onerror = function() {

      loading.style.display = "none"
      serverError.style.display = "block"
    };
    xhr.send();
}