class User {
  // user_id;
  nickname;
  email;
  password;

  success(nickname, email, pass, pass2) {
    this.nickname = nickname;
    this.email = email;
    this.password = pass;
    let n = false;
    let e = false;
    let p = false;

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
        const session = new Session();
        session.user_id = data.id;
        session.startSession();
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async get(user_id) {
    const response = await fetch(
      "https://678fd9eb49875e5a1a9399f8.mockapi.io/users/" + user_id
    );
    const data = await response.json();
    return data;
  }

  loginUser(emailOf, passOf) {
    fetch(`https://678fd9eb49875e5a1a9399f8.mockapi.io/users`)
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (e) => e.email === emailOf && e.password === passOf
        );
        if (!user) {
          document.getElementById("wrong-login").textContent =
            "Invalid email or password";
        } else {
          this.user_id = data.id;
          this.email = emailOf;
          this.password = passOf;
          document.getElementById("wrong-login").textContent = "";
          location.href = "/vibely.html";
          const session = new Session();
          session.user_id = user.id;
          session.startSession();
          return user;
        }
      })
      .catch((error) => console.log(error));
  }

  async changeUser(newEmail, newUsername, newPass, user_id) {
    if (
      /^[a-zA-Z][a-zA-Z0-9_]{4,14}$/.test(newUsername) &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[dD][eE]$/.test(newEmail) &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/.test(newPass)) {
        let user = {
          email: newEmail,
          username: newUsername,
          password: newPass,
        };
        user = JSON.stringify(user);
        const response = await fetch("https://678fd9eb49875e5a1a9399f8.mockapi.io/users/" + user_id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: user,
        })
          const data = await response.json();
          return data;
    }else{
      document.getElementById("wrongChangeProfile").textContent = 'Enter a valid data!';
    }
   
  }

  async deleteUser(user_id){
    const response = await fetch("https://678fd9eb49875e5a1a9399f8.mockapi.io/users/" + user_id, {
      method: "DELETE"
    })
    const data = await response.json();
    return data;
  }
}
