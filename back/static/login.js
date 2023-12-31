function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('name').value,
            pass: document.getElementById('password').value,
            type: document.getElementById('tip').value
        };

        fetch('http://127.0.0.1:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'index.html';
                }
            });
    });
}