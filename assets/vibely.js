const changeUsername = document.getElementById("change-username");
const cahngeEmail = document.getElementById("change-email");
const changePass = document.getElementById("change-password");

let session = new Session();
session = session.getSession();

let globalUser;

console.log(session === "")

if(session !== ""){
    // location.href = "/vibely.html";
    const getUser = async () =>{
        console.log(session)
        let user = new User();
        user = await user.get(session);
        globalUser = user;
        document.getElementById("profile-username").textContent = user.username;
        document.getElementById("profile-email").textContent = user.email;
        return user;
    }
    document.getElementById("logout").addEventListener("click", () => {
        const destroy = new Session();
        destroy.destroySession();
        location.href = "/index.html";
    });

    document.getElementById("changeUserBtn").addEventListener("click", async () => {
        let user = new User();
        await user.deleteUser(session);
        const destroy = new Session();
        destroy.destroySession();
        location.href = "/index.html";
    })

    document.getElementById("putUserBtn").addEventListener("click", async () => {
        let user = new User();
        user = await user.changeUser(cahngeEmail.value, changeUsername.value, changePass.value, session);
        document.getElementById("profile-username").textContent = user.username;
        document.getElementById("profile-email").textContent = user.email;
        document.querySelector(".black-drop").classList.toggle("visible");
        document.querySelector(".changeProfile-modal").classList.toggle("visible");
    })

    document.getElementById("changeModalBtn").addEventListener("click", () => {
        document.querySelector(".black-drop").classList.toggle("visible");
        document.querySelector(".changeProfile-modal").classList.toggle("visible");

        changeUsername.value = globalUser.username;
        cahngeEmail.value = globalUser.email;
        changePass.value = globalUser.password;
    })
    document.querySelector(".close-modal-btn").addEventListener("click", () => {
        document.querySelector(".black-drop").classList.toggle("visible");
        document.querySelector(".changeProfile-modal").classList.toggle("visible");
    })

    getUser();
}else{
    location.href = "/index.html";

}