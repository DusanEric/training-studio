function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    //fetch
    fetch('http://127.0.0.1:8080/api/trenings', {headers: {
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
                id: document.getElementById("novi_trening_id").value,
                tip: document.getElementById("novi_trening_tip").value,
            };
            nt = JSON.stringify(noviTask);
                fetch("http://127.0.0.1:8080/api/trenings",
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
                            fetch('http://127.0.0.1:8080/api/trenings', { method:"GET" })
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("novi_trening_id").value = '';
            document.getElementById("novi_trening_tip").value = '';
        });

        document.getElementById("btn_obrisi").addEventListener("click", function(){
            console.log(this);
            let obrisiTask = {
                id: document.getElementById("novi_trening_id").value,
                tip: document.getElementById("novi_trening_tip").value,
            };
            fetch("http://127.0.0.1:8080/api/trenings/"+obrisiTask.id,{method: "DELETE" ,headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then( response=>response.json())
                .then( data => {
                    //ponovo učitavamo celu listu
                    fetch('http://127.0.0.1:8080/api/trenings', { headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                        .then(response => response.json())
                        .then(data => updateTaskList(data) );
                });
        });

        document.getElementById("btn_prikazi").addEventListener("click", function(){
            console.log(this);
            let trening = {
                id: document.getElementById("izmena_trening_id").value
            }
            fetch("http://127.0.0.1:8080/api/trenings/"+trening.id, {method: "GET",headers: {
                'Authorization': `Bearer ${token}`
            }})
                .then(response => response.json())
                .then(data => {
                    document.getElementById("izmena_trening_tip").value = data.tip;
                });
        });

        document.getElementById("btn_sacuvaj").addEventListener("click", function(){
            console.log(this);
            let id = document.getElementById("izmena_trening_id").value;
            let trening = {
                tip: document.getElementById("izmena_trening_tip").value,
            }
            nt = JSON.stringify(trening);
            fetch("http://127.0.0.1:8080/api/trenings/"+ id,
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
                            fetch('http://127.0.0.1:8080/api/trenings', { method:"GET" ,headers: {
                                'Authorization': `Bearer ${token}`
                            }})
                                .then(response => response.json())
                                .then(data => updateTaskList(data) );
                        });
            document.getElementById("izmena_trening_id").value = '';
            document.getElementById("izmena_trening_tip").value = '';
        });
}

function updateTaskList(tasks){
    console.log(tasks);
    var tabela = document.getElementById("treninzi");
    tabela.innerHTML = "";
    for(i in tasks){
        let redHTML = `<tr>
            <td>`+tasks[i].id+`</td>
            <td>`+tasks[i].tip+`</td>
            <td>`;
        tabela.innerHTML += redHTML;
    }
}


