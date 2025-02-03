let session = new Session();
session = session.getSession();

let globalUser;

if(session !== ""){
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


    document.getElementById("changeModalBtn").addEventListener("click", () => {
        document.querySelector(".black-drop").classList.toggle("visible");
        document.querySelector(".changeProfile-modal").classList.toggle("visible");

        document.getElementById("change-username").value = globalUser.username;
        document.getElementById("change-email").value = globalUser.email;
        document.getElementById("change-password").value = globalUser.password;
    })
    document.querySelector(".close-modal-btn").addEventListener("click", () => {
        document.querySelector(".black-drop").classList.toggle("visible");
        document.querySelector(".changeProfile-modal").classList.toggle("visible");
    })

    getUser();
}