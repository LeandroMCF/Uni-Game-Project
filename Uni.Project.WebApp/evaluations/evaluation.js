function decodeJwtToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getAllEv(id) {
    
    console.log(id)

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:7033/api/Evaluation/all/'+id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {

        var getJson = JSON.parse(xhr.responseText)
        var container = document.getElementById("mark-others-evaluation");

        for (var i = 0; i < getJson.length; i++) {
            
            var dados = getJson[i];
            console.log(dados)

            var divInterna = document.createElement("div");
            divInterna.className = "evaluations";

            var alinhamentoDiv1 = document.createElement("div");
            alinhamentoDiv1.className = "aling-intern-evaluation";

            var alinhamentoDiv2 = document.createElement("div");
            alinhamentoDiv2.className = "aling-intern-evaluation";

            var alinhamentoDiv3 = document.createElement("div");
            alinhamentoDiv3.className = "aling-intern-evaluation";
    
            // Adicionar os elementos dentro da div interna
            var nomeElement = document.createElement("p");
            nomeElement.style.fontSize = "20px";
            nomeElement.textContent = dados.UserIdNavigation.Name;
    
            var notaElement = document.createElement("h3");
            notaElement.style.fontSize = "30px";
            notaElement.textContent = dados.Score;
    
            var comentarioElement = document.createElement("p");
            comentarioElement.textContent = dados.Description;

            alinhamentoDiv1.appendChild(nomeElement)
            alinhamentoDiv2.appendChild(notaElement)
            alinhamentoDiv3.appendChild(comentarioElement)
    
            divInterna.appendChild(alinhamentoDiv1);
            divInterna.appendChild(alinhamentoDiv2);
            divInterna.appendChild(alinhamentoDiv3);
            
            container.appendChild(divInterna);
        }
    };
    xhr.onerror = function() {

        console.log("ERR")
    };
    xhr.send();
}

function mount() {
    // Obter token do Local Storage
    var token = localStorage.getItem('token');

    if (token) {

        var decodedToken = decodeJwtToken(token);
        getAllEv(decodedToken.nameid)

        var userName = document.getElementById('userName');
        
        userName.textContent = decodedToken.unique_name;

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
    const btnCancel = document.getElementById('cancel-btn-create');
    const btnCancelUpdate = document.getElementById('cancel-btn-update');

    var scoreEdit = document.getElementById("scoreEdit");
    var descriptionEdit = document.getElementById("descriptionEdit");

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:7033/api/Evaluation/'+decodedToken.nameid);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {

        btnUpdate.style.display = 'flex';
        btnSave.style.display = 'none';
        btnCancelUpdate.style.display = 'flex';
        btnCancel.style.display = 'none';
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

function cancelCreate() {

    const elementoEd = document.querySelector('.edit-evaluation');
    const elementoEv = document.getElementById('aling-btns');
    const btnEvaluation = document.getElementById('btn-evaluation');

    elementoEd.style.display = 'none'
    elementoEv.style.display = 'flex';
    btnEvaluation.style.display = 'flex';
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
                
                window.location.href = "https://drive.google.com/file/d/1jemKiooX1MA7uuh5PMEaYuKAIuru1TtR/view";
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
    const btnCancel = document.getElementById('cancel-btn-create');
    const btnCancelUpdate = document.getElementById('cancel-btn-update');
    const aling = document.getElementById('aling-btns');

    aling.style.display = 'none'
    btn.style.display = 'none';
    btnUpdate.style.display = 'none';
    btnSave.style.display = 'flex';
    btnCancelUpdate.style.display = 'none';
    btnCancel.style.display = 'flex';
    elementoEd.style.display = 'flex'
}

function remove() {

    var token = localStorage.getItem('token');

    var decodedToken = decodeJwtToken(token);

    var userId = decodedToken.nameid;   

    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://localhost:7033/api/Evaluation/delete/evaluating/'+userId);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            debugger
            if (xhr.responseText == "Avaliação deletada com sucesso!") {
                debugger
                window.location.href = "../home.html";
            }
            else{
                debugger
                console.log("ERR")
            }
        } 
        else {
            debugger
            console.log("ERR")
        }
    };
    xhr.send();
}