const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const registerModal = document.querySelector(".register-modal");
const loginModal = document.querySelector(".login-modal");
const blackDrop = document.querySelector(".black-drop");

const registerNickname = document.getElementById("register-nickname").value;
const registerEmail = document.getElementById("register-email").value;
const registerPass = document.getElementById("register-password").value;
const registerPass2 = document.getElementById("register-password-repeat").value;
const registerModalBtn = document.getElementById("register-btn");


const validateRegisterData = (event) => {
    event.preventDefault();
    if(!/^[a-zA-Z][a-zA-Z0-9_]{2,14}$/.test(registerNickname)){
        document.getElementById("wrong-enter-nickname").textContent = "radi";
    }else{
        document.getElementById("wrong-enter-nickname").textContent = '';
    }
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