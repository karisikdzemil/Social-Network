let session = new Session();
session = session.getSession();

if(session !== ""){
    const getUser = async () =>{
        let user = new User();
        user = await user.get(session);
        console.log(user)
        document.getElementById("profile-username").textContent = user.username;
        document.getElementById("profile-email").textContent = user.email;
    }
    getUser()
}