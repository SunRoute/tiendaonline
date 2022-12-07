export let renderLogin = () => {
    
    let login = {
        password: "password",
        email: "carlossedagambin@gmail.com",
    }

    fetch('http://192.168.1.16:8080/api/auth/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        sessionStorage.setItem('accessToken', data.accessToken);
    }).catch(error => {
        console.log(error);
    });
}