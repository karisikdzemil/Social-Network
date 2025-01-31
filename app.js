const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const registerModal = document.querySelector(".register-modal");
const loginModal = document.querySelector(".login-modal");
const blackDrop = document.querySelector(".black-drop");

const registerNickname = document.getElementById("register-nickname");
const registerEmail = document.getElementById("register-email");
const registerPass = document.getElementById("register-password");
const registerPass2 = document.getElementById("register-password-repeat");
const registerModalBtn = document.getElementById("register-btn");
const loginValidateBtn = document.getElementById("loginValidateBtn");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-password");


const validateRegisterData = (event) => {
    event.preventDefault();
    const user = new Register();
    const proba = user.success(registerNickname.value, registerEmail.value, registerPass.value, registerPass2.value);
    registerNickname.value = '';
    registerEmail.value = '';
    registerPass.value = '';
    registerPass2.value = '';
    // showRegisterModalHandler();
    // console.log(proba)
    // const sesija = new Session()
}

const validateLoginData = async () => {
    const findUser = new Login();
    await findUser.success(loginEmail.value, loginPass.value, (updateUser) => {
        console.log(updateUser)
    });
    // console.log(findUser)
}

const showLoginModalHandler = () => {
    loginModal.classList.toggle("visible");
    blackDrop.classList.toggle("visible");
}

const showRegisterModalHandler = () => {
    registerModal.classList.toggle("visible");
    blackDrop.classList.toggle("visible");
}

loginValidateBtn.addEventListener("click", validateLoginData);
registerModalBtn.addEventListener("click", validateRegisterData);
loginBtn.addEventListener("click", showLoginModalHandler);
registerBtn.addEventListener("click", showRegisterModalHandler);