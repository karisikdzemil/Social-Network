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


const validateRegisterData = (event) => {
    event.preventDefault();
    const dzemil = new Register();
    console.log(registerNickname.value, registerEmail.value, registerPass.value, registerPass2.value)
    console.log(dzemil)
}

const showLoginModalHandler = () => {
    loginModal.classList.toggle("visible");
    blackDrop.classList.toggle("visible");
}

const showRegisterModalHandler = () => {
    registerModal.classList.toggle("visible");
    blackDrop.classList.toggle("visible");
}

registerModalBtn.addEventListener("click", validateRegisterData)
loginBtn.addEventListener("click", showLoginModalHandler);
registerBtn.addEventListener("click", showRegisterModalHandler);