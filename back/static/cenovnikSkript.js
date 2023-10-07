function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    //fetch
    fetch('http://127.0.0.1:8080/api/cenovniks', {headers: {
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
                id: document.getElementById("nova_cena_id").value,
                cena: document.getElementById("nova_cena_iznos").value,
                treningID: document.getElementById("nova_cena_trening_id").value,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/cenovniks",
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
                            fetch('http://127.0.0.1:8080/api/cenovniks', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("nova_cena_id").value = '';
            document.getElementById("nova_cena_iznos").value = '';
            document.getElementById("nova_cena_trening_id").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("nova_cena_id").value,
                cena: document.getElementById("nova_cena_iznos").value,
                treningID: document.getElementById("nova_cena_trening_id").value,
            };
            fetch("http://127.0.0.1:8080/api/cenovniks/"+obrisiTask.id,{ method:"DELETE" ,headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/cenovniks', { method:"GET" ,headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let cena = {
                id: document.getElementById("izmena_cena_id").value
            }
            fetch("http://127.0.0.1:8080/api/cenovniks/"+cena.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_cena_cena").value = data.cena;
                    document.getElementById("izmena_cena_treningId").value = data.treningID;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_cena_id").value;
            let cenovnik = {
                cena: document.getElementById("izmena_cena_cena").value,
                treningID: document.getElementById("izmena_cena_treningId").value,
            }
            nt = JSON.stringify(cenovnik);
            fetch("http://127.0.0.1:8080/api/cenovniks/"+ id,
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
                            fetch('http://127.0.0.1:8080/api/cenovniks', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("izmena_cena_id").value = '';
            document.getElementById("izmena_cena_cena").value = '';
            document.getElementById("izmena_cena_treningId").value = '';
        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("cenovnici");
    tabela.innerHTML = "";
    for(i in tasks){
        console.log(tasks[i]);
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].cena+`</td>
            <td>`+tasks[i].Trening.tip+`</td>
            <td>`;
        tabela.innerHTML += redHTML;
    }
}
