class User {
  nickname = "";
  email = "";
  password = "";
  success(nickname, email, pass, pass2) {
    this.nickname = nickname;
    this.email = email;
    this.password = pass;
    let n = false;
    let e = false;
    let p = false;

    console.log(nickname, email, pass, pass2);
    if (!/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/.test(nickname)) {
      document.getElementById("wrong-enter-nickname").textContent =
        "Enter a name with more than 5 letters!";
    } else {
      document.getElementById("wrong-enter-nickname").textContent = "";
      n = true;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[dD][eE]$/.test(email)) {
      document.getElementById("wrong-enter-email").textContent =
        "Enter a valid email address!";
    } else {
      document.getElementById("wrong-enter-email").textContent = "";
      e = true;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/.test(
        pass
      )
    ) {
      document.getElementById("wrong-enter-password").textContent =
        "Enter a strong password!";
    } else {
      document.getElementById("wrong-enter-password").textContent = "";
      if (pass !== pass2) {
        document.getElementById("wrong-enter-password2").textContent =
          "Passwords don't match!";
      } else {
        document.getElementById("wrong-enter-password2").textContent = "";
        p = true;
      }
    }
    if (n && e && p) {
      this.createUser(); 
    }
  }

  createUser() {
    let data = {
      email: this.email,
      username: this.nickname,
      password: this.password,
    };
    data = JSON.stringify(data);
    console.log(data);
    fetch(`https://678fd9eb49875e5a1a9399f8.mockapi.io/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!!");
        }
        return response.json();
      })
      .then((data) => {
        location.href = "/vibely.html";
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loginUser(emailOf, passOf){
    fetch(`https://678fd9eb49875e5a1a9399f8.mockapi.io/users`)
    .then(response => response.json())
    .then(data => {
      const user = data.find((e) => e.email === emailOf && e.password === passOf)
      console.log(emailOf)
        if(!user){
            document.getElementById("wrong-login").textContent = 'Invalid email or password';
        }else{
            this.email = emailOf;
            this.password = passOf;
            document.getElementById("wrong-login").textContent = '';
            location.href = '/vibely.html';
        }
    })
    .catch(error => console.log(error))
  }
}
