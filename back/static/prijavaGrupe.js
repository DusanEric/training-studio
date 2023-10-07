function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    //fetch
    fetch('http://127.0.0.1:8080/api/prijavaGrupes', {headers: {
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
                id: document.getElementById("nova_prijava_id").value,
                clanID: document.getElementById("nova_prijava_clan").value,
                treningGrupaID: document.getElementById("nova_prijava_grupa").value,
                status: false,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/prijavaGrupes",
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
                            fetch('http://127.0.0.1:8080/api/prijavaGrupes', { method:"GET", headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("nova_prijava_id").value = '';
            document.getElementById("nova_prijava_clan").value = '';
            document.getElementById("nova_prijava_grupa").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("nova_prijava_id").value,
                clanID: document.getElementById("nova_prijava_clan").value,
                treningGrupaID: document.getElementById("nova_prijava_grupa").value,
            };
            fetch("http://127.0.0.1:8080/api/prijavaGrupes/"+obrisiTask.id,{ method:"DELETE", headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/prijavaGrupes', { method:"GET", headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let prijava = {
                id: document.getElementById("izmena_prijava_id").value
            }
            fetch("http://127.0.0.1:8080/api/prijavaGrupes/"+prijava.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_prijava_clan").value = data.clanID;
                    document.getElementById("izmena_prijava_grupa").value = data.treningGrupaID;
                    document.getElementById("izmena_prijava_status").value = data.status;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_prijava_id").value;
            let trening = {
                clanID: document.getElementById("izmena_prijava_clan").value,
                treningGrupaID: document.getElementById("izmena_prijava_grupa").value,
                status: document.getElementById("izmena_prijava_status").value,
            }
            nt = JSON.stringify(trening);
            fetch("http://127.0.0.1:8080/api/prijavaGrupes/"+ id,
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
                            fetch('http://127.0.0.1:8080/api/prijavaGrupes', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("izmena_prijava_id").value = '';
            document.getElementById("izmena_prijava_clan").value = '';
            document.getElementById("izmena_prijava_grupa").value = '';
            document.getElementById("izmena_prijava_status").value = '';
        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("prijave");
    tabela.innerHTML = "";
    for(i in tasks){
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].Clan.ime+`</td>
            <td>`+tasks[i].TreningGrupa.grupa+`</td>
            <td>`;
        if(tasks[i].status == true){
            redHTML += '<span class="badge bg-success">Prijavljen</span></td>';
        } else {
            redHTML += '<span class="badge bg-danger">Čeka</span></td>';
        }
        tabela.innerHTML += redHTML;
    }
}