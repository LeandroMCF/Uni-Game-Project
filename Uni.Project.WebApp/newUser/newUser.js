function cad() {

    let xhr = new XMLHttpRequest();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cofirmPassword = document.getElementById('confirm-password').value;

    var emailError = document.getElementById("emailError")
    var campError = document.getElementById("campError")
    var lenghPassword = document.getElementById("lenghPassword")
    var serverError = document.getElementById("serverError")
    var loading = document.getElementById("loading")
  
    loading.style.display = "block"
    emailError.style.display = "none"
    serverError.style.display = "none"
    passwordError.style.display = "none"
    campError.style.display = "none"
    lenghPassword.style.display = "none"

    if (name === "" || email === "" || password === "" || cofirmPassword === "") {
        loading.style.display = "none"
        return campError.style.display = "block"
    }
    else if (password !== cofirmPassword) {

        loading.style.display = "none"
        return passwordError.style.display = "block"
    }

    xhr.open('POST', 'https://localhost:7033/api/User/cad/'+ name +"/"+ email +"/"+ password);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function() {
      if (xhr.status === 200) {
        if (xhr.responseText == 'userError') {
          
          loading.style.display = "none"
          emailError.style.display = "block"
        }
        else if (xhr.responseText == 'passError') {
          
            loading.style.display = "none"
            lenghPassword.style.display = "block"
        }
        else if (xhr.responseText == 'serverError') {
          
          loading.style.display = "none"
          serverError.style.display = "block"
        }
        else{
  
          loading.style.display = "none"
          await alert("usuário cadastrado com sucesso!")
          window.location.href = "../login/index.html";
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