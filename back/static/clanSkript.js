function init(){
    //fetch

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://127.0.0.1:8080/api/clans',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
        });
        document.getElementById("btn_dodaj").addEventListener("click", function(){
            console.log(this);
            let noviTask = {
                id: document.getElementById("novi_clan_id").value,
                ime: document.getElementById("novi_clan_ime").value,
                prezime: document.getElementById("novi_clan_prezime").value,
                broj_telefona: document.getElementById("novi_clan_broj_telefona").value,
                email: document.getElementById("novi_clan_email").value,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/clans",
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
                            fetch('http://127.0.0.1:8080/api/clans', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("novi_clan_id").value = '';
            document.getElementById("novi_clan_ime").value = '';
            document.getElementById("novi_clan_prezime").value = '';
            document.getElementById("novi_clan_broj_telefona").value = '';
            document.getElementById("novi_clan_email").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("novi_clan_id").value,
                ime: document.getElementById("novi_clan_ime").value,
                prezime: document.getElementById("novi_clan_prezime").value,
                broj_telefona: document.getElementById("novi_clan_broj_telefona").value,
                email: document.getElementById("novi_clan_email").value,
            };
            fetch("http://127.0.0.1:8080/api/clans/"+obrisiTask.id,{ method:"DELETE" ,headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/clans', { method:"GET" ,headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let clan = {
                id: document.getElementById("izmena_clan_id").value
            }
            fetch("http://127.0.0.1:8080/api/clans/"+clan.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_clan_ime").value = data.ime;
                    document.getElementById("izmena_clan_prezime").value = data.prezime;
                    document.getElementById("izmena_clan_broj_telefona").value = data.broj_telefona;
                    document.getElementById("izmena_clan_email").value = data.email;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_clan_id").value;
            let clan = {
                ime: document.getElementById("izmena_clan_ime").value,
                prezime: document.getElementById("izmena_clan_prezime").value,
                broj_telefona: document.getElementById("izmena_clan_broj_telefona").value,
                email: document.getElementById("izmena_clan_email").value,
            }
            nt = JSON.stringify(clan);
            fetch("http://127.0.0.1:8080/api/clans/"+ id,
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
                            fetch('http://127.0.0.1:8080/api/clans', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
                        document.getElementById("izmena_clan_id").value = '';
                        document.getElementById("izmena_clan_ime").value = '';
                        document.getElementById("izmena_clan_prezime").value = '';
                        document.getElementById("izmena_clan_broj_telefona").value = '';
                        document.getElementById("izmena_clan_email").value = '';
        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("clanovi");
    tabela.innerHTML = "";
    for(i in tasks){
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].ime+`</td>
            <td>`+tasks[i].prezime+`</td>
            <td>`+tasks[i].broj_telefona+`</td>
            <td>`+tasks[i].email+`</td>
            <td>`;
        tabela.innerHTML += redHTML;
    }
}