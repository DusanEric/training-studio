function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    //fetch
    fetch('http://127.0.0.1:8080/api/placanjes', {headers: {
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
                id: document.getElementById("novo_placanje_id").value,
                iznos: document.getElementById("novo_placanje_iznos").value,
                racun: document.getElementById("novo_placanje_racun").value,
                cenovnikID: document.getElementById("novo_placanje_cena").value,
                clanID: document.getElementById("novo_placanje_clan").value,
                status: false,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/placanjes",
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
                            fetch('http://127.0.0.1:8080/api/placanjes', { method:"GET", headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("novo_placanje_id").value = '';
            document.getElementById("novo_placanje_iznos").value = '';
            document.getElementById("novo_placanje_racun").value = '';
            document.getElementById("novo_placanje_cena").value = '';
            document.getElementById("novo_placanje_clan").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("novo_placanje_id").value,
                iznos: document.getElementById("novo_placanje_iznos").value,
                racun: document.getElementById("novo_placanje_racun").value,
                cenovnikID: document.getElementById("novo_placanje_cena").value,
                clanID: document.getElementById("novo_placanje_clan").value,
            };
            fetch("http://127.0.0.1:8080/api/placanjes/"+obrisiTask.id,{ method:"DELETE", headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/placanjes', { method:"GET", headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let trening = {
                id: document.getElementById("izmena_placanje_id").value
            }
            fetch("http://127.0.0.1:8080/api/placanjes/"+trening.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_placanje_iznos").value = data.iznos;
                    document.getElementById("izmena_placanje_racun").value = data.racun;
                    document.getElementById("izmena_placanje_cena").value = data.cenovnikID;
                    document.getElementById("izmena_placanje_clan").value = data.clanID;
                    document.getElementById("izmena_placanje_status").value = data.status;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_placanje_id").value;
            let trening = {
                iznos: document.getElementById("izmena_placanje_iznos").value,
                racun: document.getElementById("izmena_placanje_racun").value,
                cenovnikID: document.getElementById("izmena_placanje_cena").value,
                clanID: document.getElementById("izmena_placanje_clan").value,
                status: document.getElementById("izmena_placanje_status").value,
            }
            nt = JSON.stringify(trening);
            fetch("http://127.0.0.1:8080/api/placanjes/"+ id,
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
                            fetch('http://127.0.0.1:8080/api/placanjes', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("izmena_placanje_id").value = '';
            document.getElementById("izmena_placanje_iznos").value = '';
            document.getElementById("izmena_placanje_racun").value = '';
            document.getElementById("izmena_placanje_cena").value = '';
            document.getElementById("izmena_placanje_clan").value = '';
            document.getElementById("izmena_placanje_status").value = '';        
        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("placanja");
    tabela.innerHTML = "";
    for(i in tasks){
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].iznos+`</td>
            <td>`+tasks[i].racun+`</td>
            <td>`+tasks[i].Cenovnik.cena+`</td>
            <td>`+tasks[i].Clan.ime+`</td>
            <td>`;
            if(tasks[i].status == true){
                redHTML += '<span class="badge bg-success">Placeno</span></td>';
            } else {
                redHTML += '<span class="badge bg-danger">Čeka</span></td>';
            }
        tabela.innerHTML += redHTML;
    }
}