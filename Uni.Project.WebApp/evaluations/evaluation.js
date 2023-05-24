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

        // if (isDownload == "True") {
        //     getEvaluation(decodedToken.nameid)
        // }
        // else{
        //     loading.style.display = "none"
        //     var aling = document.getElementById('aling-btns');
        //     var download = document.getElementById('btn-download');
        //     aling.style.display = 'flex'
        //     download.style.display = 'flex'
        // }

        const elemento = document.getElementById('loading');
        const elementoEv = document.querySelector('.my-Evaluation');

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://localhost:7033/api/Evaluation/verify/'+decodedToken.nameid);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            
            if (xhr.responseText == "Allow") {
                elemento.style.display = 'none';
                var download = document.getElementById('btn-evaluation');
                var aling = document.getElementById('aling-btns');
                aling.style.display = 'flex'
                download.style.display = 'flex'
            }
            else if(xhr.responseText == "notAllow-noDownload"){
                loading.style.display = "none"
                var aling = document.getElementById('aling-btns');
                var download = document.getElementById('btn-download');
                aling.style.display = 'flex'
                download.style.display = 'flex'
            }
            else{

                xhr.open('GET', 'https://localhost:7033/api/Evaluation/'+decodedToken.nameid);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function() {
                    elemento.style.display = 'none';
                    elementoEv.style.display = 'flex';
                    var jsonEv = JSON.parse(xhr.responseText)
        
                    var evTitle = document.getElementById("evaluation-title");
                    var score = document.getElementById("score");
                    var description = document.getElementById("description");
        
                    evTitle.style.display = 'flex'
                    score.textContent = jsonEv.score.toString();
                    description.textContent = jsonEv.description.toString();
                };
                xhr.onerror = function() {
        
                    loading.style.display = "none"
                    serverError.style.display = "block"
                };
                xhr.send();
            }
            
        };
        xhr.onerror = function() {

            loading.style.display = "none"
            serverError.style.display = "block"
        };
        xhr.send();
    } 
    else {

        window.location.href = "../login/index.html";
    }
}

function getEvaluation(id) {
    
    const elemento = document.getElementById('loading');
    const elementoEv = document.querySelector('.my-Evaluation');

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://localhost:7033/api/Evaluation/verify/'+id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        
        if (xhr.responseText == "Allow") {
            elemento.style.display = 'none';
            var download = document.getElementById('btn-evaluation');
            var aling = document.getElementById('aling-btns');
            aling.style.display = 'flex'
            download.style.display = 'flex'
        }
        else{

            xhr.open('GET', 'https://localhost:7033/api/Evaluation/'+id);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                elemento.style.display = 'none';
                elementoEv.style.display = 'flex';
                var jsonEv = JSON.parse(xhr.responseText)
    
                var evTitle = document.getElementById("evaluation-title");
                var score = document.getElementById("score");
                var description = document.getElementById("description");
    
                evTitle.style.display = 'flex'
                score.textContent = jsonEv.score.toString();
                description.textContent = jsonEv.description.toString();
            };
            xhr.onerror = function() {
    
                loading.style.display = "none"
                serverError.style.display = "block"
            };
            xhr.send();
        }
        
    };
    xhr.onerror = function() {

        loading.style.display = "none"
        serverError.style.display = "block"
    };
    xhr.send();
}

function edit() {

    var token = localStorage.getItem('token');
    var decodedToken = decodeJwtToken(token);

    const elementoEd = document.querySelector('.edit-evaluation');
    const elementoEv = document.querySelector('.my-Evaluation');
    const btnSave = document.getElementById('save-btn-create');
    const btnUpdate = document.getElementById('save-btn-update');

    var scoreEdit = document.getElementById("scoreEdit");
    var descriptionEdit = document.getElementById("descriptionEdit");

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:7033/api/Evaluation/'+decodedToken.nameid);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {

        btnUpdate.style.display = 'flex';
        btnSave.style.display = 'none';
        elementoEv.style.display = 'none';
        elementoEd.style.display = 'flex'
        var jsonEv = JSON.parse(xhr.responseText)

        scoreEdit.value = jsonEv.score;
        descriptionEdit.textContent = jsonEv.description.toString();
    };
    xhr.onerror = function() {

        loading.style.display = "none"
        serverError.style.display = "block"
    };
    xhr.send();
}

function save() {

    var token = localStorage.getItem('token');
    var decodedToken = decodeJwtToken(token);

    var scoreEdit = document.getElementById("scoreEdit").value;
    var descriptionEdit = document.getElementById("descriptionEdit").value;

    console.log(scoreEdit)
    console.log(descriptionEdit)

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://localhost:7033/api/Evaluation/evaluating/'+scoreEdit+'/'+descriptionEdit+'/'+decodedToken.nameid);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function() {
        
        var returnApi = xhr.responseText

        await alert(returnApi)
        location.reload()
    };
    xhr.onerror = function() {

        console.log("ERR")
    };
    xhr.send();
}

function saveCreate() {

    var token = localStorage.getItem('token');
    var decodedToken = decodeJwtToken(token);

    var scoreEdit = document.getElementById("scoreEdit").value;
    var descriptionEdit = document.getElementById("descriptionEdit").value;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://localhost:7033/api/Evaluation/evaluating/'+scoreEdit+'/'+descriptionEdit+'/'+decodedToken.nameid);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = async function() {
        
        var returnApi = xhr.responseText

        await alert(returnApi)
        location.reload()
    };
    xhr.onerror = function() {

        console.log("ERR")
    };
    xhr.send();
}

function cancel() {
    const elementoEd = document.querySelector('.edit-evaluation');
    const elementoEv = document.querySelector('.my-Evaluation');

    elementoEd.style.display = 'none'
    elementoEv.style.display = 'flex';
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

function evaluating() {

    const elementoEd = document.querySelector('.edit-evaluation');
    const btn = document.getElementById('btn-evaluation');
    const btnSave = document.getElementById('save-btn-create');
    const btnUpdate = document.getElementById('save-btn-update');

    btn.style.display = 'none';
    btnUpdate.style.display = 'none';
    btnSave.style.display = 'flex';
    elementoEd.style.display = 'flex'
}