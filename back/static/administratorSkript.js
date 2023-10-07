function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    //fetch
    fetch('http://127.0.0.1:8080/api/administrators', {headers: {
        'Authorization': `Bearer ${token}`
    }})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
        });
        document.getElementById("btn_dodaj").addEventListener("click", function(){
            console.log(this);
            let noviTask = {
                id: document.getElementById("novi_admin_id").value,
                username: document.getElementById("novi_admin_username").value,
                pass: document.getElementById("novi_admin_password").value,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/administrators",
                        {
                            method:"POST",
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: nt
                        })
                        .then( response=>response.json())
                        .then( data => {
                            //ponovo učitavamo celu listu
                            fetch('http://127.0.0.1:8080/api/administrators', { method:"GET" , headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("novi_admin_id").value = '';
            document.getElementById("novi_admin_username").value = '';
            document.getElementById("novi_admin_password").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("novi_admin_id").value,
                username: document.getElementById("novi_admin_username").value,
                pass: document.getElementById("novi_admin_password").value,
            };
            fetch("http://127.0.0.1:8080/api/administrators/"+obrisiTask.id,{ method:"DELETE" , headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/administrators', { method:"GET", headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let admin = {
                id: document.getElementById("izmena_admin_id").value
            }
            fetch("http://127.0.0.1:8080/api/administrators/"+admin.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_admin_username").value = data.username;
                    document.getElementById("izmena_admin_password").value = data.pass;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_admin_id").value;
            let trening = {
                username: document.getElementById("izmena_admin_username").value,
                pass: document.getElementById("izmena_admin_password").value,
            }
            nt = JSON.stringify(trening);
            fetch("http://127.0.0.1:8080/api/administrators/"+ id,
                        {
                            method:"PUT",
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: nt
                        })
                        .then( response=>response.json())
                        .then( data => {
                            //ponovo učitavamo celu listu
                            fetch('http://127.0.0.1:8080/api/administrators', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("izmena_admin_id").value = '';
            document.getElementById("izmena_admin_username").value = '';
            document.getElementById("izmena_admin_password").value = '';

        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("administratori");
    tabela.innerHTML = "";
    for(i in tasks){
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].username+`</td>
            <td>`+tasks[i].pass+`</td>
            <td>`;
        tabela.innerHTML += redHTML;
    }
}