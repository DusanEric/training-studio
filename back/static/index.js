function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    //fetch
    fetch('http://127.0.0.1:8080/api/treningGrupas', 
    {headers: {
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
                id: document.getElementById("novi_grupa_id").value,
                grupa: document.getElementById("novi_grupa").value,
                treningID: document.getElementById("nova_grupa_trening").value,
                trenerID: document.getElementById("nova_grupa_trener").value,
                treningStudioID: document.getElementById("nova_grupa_trening_studio").value,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/treningGrupas",
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
                            fetch('http://127.0.0.1:8080/api/treningGrupas', { method:"GET",headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("nova_grupa_id").value = '';
            document.getElementById("nova_grupa_trening").value = '';
            document.getElementById("nova_grupa_trener").value = '';
            document.getElementById("nova_grupa_trening_studio").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("novi_grupa_id").value,
                grupa: document.getElementById("novi_grupa").value,
                treningID: document.getElementById("nova_grupa_trening").value,
                trenerID: document.getElementById("nova_grupa_trener").value,
                treningStudioID: document.getElementById("nova_grupa_trening_studio").value,
            };
            fetch("http://127.0.0.1:8080/api/treningGrupas/"+obrisiTask.id,{ method:"DELETE",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/treningGrupas', { method:"GET",headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let trening = {
                id: document.getElementById("izmena_grupa_id").value
            }
            fetch("http://127.0.0.1:8080/api/treningGrupas/"+trening.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_grupa_grupa").value = data.grupa;
                    document.getElementById("izmena_grupa_treningId").value = data.treningID;
                    document.getElementById("izmena_grupa_trenerId").value = data.trenerID;
                    document.getElementById("izmena_grupa_treningStudioId").value = data.treningStudioID;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_grupa_id").value;
            let trening = {
                grupa : document.getElementById("izmena_grupa_grupa").value,
                treningID : document.getElementById("izmena_grupa_treningId").value,
                trenerID : document.getElementById("izmena_grupa_trenerId").value,
                treningStudioID : document.getElementById("izmena_grupa_treningStudioId").value
            }
            nt = JSON.stringify(trening);
            fetch("http://127.0.0.1:8080/api/treningGrupas/"+ id,
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
                            fetch('http://127.0.0.1:8080/api/treningGrupas', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("izmena_grupa_id").value = '';
            document.getElementById("izmena_grupa_grupa").value = '';
            document.getElementById("izmena_grupa_treningId").value = '';
            document.getElementById("izmena_grupa_trenerId").value = '';
            document.getElementById("izmena_grupa_treningStudioId").value = '';        
        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("grupe");
    tabela.innerHTML = "";
    for(i in tasks){
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].grupa+`</td>
            <td>`+tasks[i].Trener.ime+`</td>
            <td>`+tasks[i].Trening.tip+`</td>
            <td>`+tasks[i].TreningStudio.naziv+`</td>
            <td>`;
        tabela.innerHTML += redHTML;
    }
}