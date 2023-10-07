function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    //fetch
    fetch('http://127.0.0.1:8080/api/treningStudios', {headers: {
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
                id: document.getElementById("novi_trening_studio_id").value,
                naziv: document.getElementById("novi_trening_studio_naziv").value,
                lokacijaID: document.getElementById("novi_trening_studio_lokacija").value,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/treningStudios",
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
                            fetch('http://127.0.0.1:8080/api/treningStudios', { method:"GET",headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("novi_trening_studio_id").value = '';
            document.getElementById("novi_trening_studio_naziv").value = '';
            document.getElementById("novi_trening_studio_lokacija").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("novi_trening_studio_id").value,
                naziv: document.getElementById("novi_trening_studio_naziv").value,
                lokacijaID: document.getElementById("novi_trening_studio_lokacija").value,
            };
            fetch("http://127.0.0.1:8080/api/treningStudios/"+obrisiTask.id,{ method:"DELETE", headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/treningStudios', { method:"GET", headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let trening = {
                id: document.getElementById("izmena_treningStudio_id").value
            }
            fetch("http://127.0.0.1:8080/api/treningStudios/"+trening.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_treningStudio_id").value = data.naziv;
                    document.getElementById("izmena_treningStudio_id").value = data.lokacijaID;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_treningStudio_id").value;
            let trening = {
                naziv: document.getElementById("izmena_treningStudio_naziv").value,
                lokacijaID: document.getElementById("izmena_treningStudio_lokacija").value,
            }
            nt = JSON.stringify(trening);
            fetch("http://127.0.0.1:8080/api/treningStudios/"+ id,
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
                            fetch('http://127.0.0.1:8080/api/treningStudios', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("izmena_treningStudio_id").value = '';
            document.getElementById("izmena_treningStudio_naziv").value = '';
            document.getElementById("izmena_treningStudio_lokacija").value = '';
        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("teretane");
    tabela.innerHTML = "";
    for(i in tasks){
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].naziv+`</td>
            <td>`+tasks[i].Lokacija.lokacija+`</td>
            <td>`;
        tabela.innerHTML += redHTML;
    }
}