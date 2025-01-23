class Login{
    email = ''
    password = ''

    success(emailOf, passOf, callBack){
        fetch(`https://678fd9eb49875e5a1a9399f8.mockapi.io/users`)
        .then(response => response.json())
        .then(data => {
           const user = data.find((e) => e.email === emailOf && e.password === passOf)
            if(!user){
                document.getElementById("wrong-login").textContent = 'Invalid email or password';
            }else{
                this.email = emailOf;
                this.password = passOf;
                document.getElementById("wrong-login").textContent = '';
                location.href = '/vibely.html';
            }
            if(callBack) callBack(this);
        })
        .catch(error => console.log(error))
    }
}