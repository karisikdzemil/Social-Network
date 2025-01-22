class Register{
        nickname = '';
        email = '';
        password = '';
    success(nickname, email, pass, pass2){
        this.nickname = nickname;
        this.email = email;
        this.password = pass;
        let n = false;
        let e = false;
        let p = false;

        console.log(nickname, email, pass)
        if(!/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/.test(nickname)){
            document.getElementById("wrong-enter-nickname").textContent = "Enter a name with more than 5 letters!";
        }else{
            document.getElementById("wrong-enter-nickname").textContent = '';
            n = true;
        }
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[dD][eE]$/.test(email)){
            document.getElementById("wrong-enter-email").textContent = "Enter a valid email address!";
        }else{
            document.getElementById("wrong-enter-email").textContent = '';
            e = true;
        }
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/.test(pass)){
            document.getElementById("wrong-enter-password").textContent = "Enter a strong password!";
        }else{
            document.getElementById("wrong-enter-password").textContent = '';
            if(pass === pass2){
                p = true;
            }else{
            document.getElementById("wrong-enter-password2").textContent = "Passwords don't match!";
            }
        }
    }
}