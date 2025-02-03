const changeUsername = document.getElementById("change-username");
const cahngeEmail = document.getElementById("change-email");
const changePass = document.getElementById("change-password");
const ul = document.getElementById("posts");


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

    const getPosts = async () => {
        let posts = new Post();
        posts = await posts.getPosts();

        posts.forEach(async el => {
            let user = new User();
            user = await user.get(el.user_id);
            // ul.innerHTML += `
            //        <li class="single-post">
            //         <div class="post-content">
            //             <p>${el.content}</p>
            //         </div>
            //         <div class="post-actions">
            //             <p>Author: <span>${user.username}</span></p>

            //             <div class="post-buttons">
            //                <span> <button class="post-btn"><i class="fa-solid fa-thumbs-up"></i></button> <p>${el.likes} likes</p></span>
            //                 <span><button class="post-btn"><i class="fa-solid fa-comment"></i></button> <p>comments</p></span>
            //             </div>
            //         </div>
            //     </li>
            // `;

            console.log(session === el.user_id)
            // const removePostBtn = '<button class="remove-post-btn">Remove</button>';
            const postButtons = document.querySelector(".post-buttons");
            if(session === el.user_id){
                ul.innerHTML += `
                <li class="single-post">
                 <div class="post-content">
                     <p>${el.content}</p>
                 </div>
                 <div class="post-actions">
                     <p>Author: <span>${user.username}</span></p>

                     <div class="post-buttons">
                        <span> <button class="post-btn"><i class="fa-solid fa-thumbs-up"></i></button> <p>${el.likes} likes</p></span>
                         <span><button class="post-btn"><i class="fa-solid fa-comment"></i></button> <p>comments</p></span>
                         <button class="remove-post-btn">Remove</button>
                     </div>
                 </div>
             </li>
         `;
            }else{
                ul.innerHTML += `
                <li class="single-post">
                 <div class="post-content">
                     <p>${el.content}</p>
                 </div>
                 <div class="post-actions">
                     <p>Author: <span>${user.username}</span></p>

                     <div class="post-buttons">
                        <span> <button class="post-btn"><i class="fa-solid fa-thumbs-up"></i></button> <p>${el.likes} likes</p></span>
                         <span><button class="post-btn"><i class="fa-solid fa-comment"></i></button> <p>comments</p></span>
                     </div>
                 </div>
             </li>
         `;
            }
        });
    }
    getPosts();
    document.getElementById("post-btn").addEventListener("click", async () => {
        const writePostContent = document.getElementById("writePostContent");
        if(writePostContent.value !== ''){
        let post = new Post(session, writePostContent.value, 0);
        post = await post.createPost();
        console.log(post)
        writePostContent.value = '';

        let user = new User();
        user = await user.get(post.user_id)
        console.log(user)
        ul.innerHTML += `
              <li class="single-post">
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    <div class="post-actions">
                        <p>Author: <span>${user.username}</span></p>

                        <div class="post-buttons">
                           <span> <button class="post-btn"><i class="fa-solid fa-thumbs-up"></i></button> <p>${post.likes} likes</p></span>
                            <span><button class="post-btn"><i class="fa-solid fa-comment"></i></button> <p>comments</p></span>
                            <button class="remove-post-btn">Remove</button>
                        </div>
                    </div>
                </li>

        `;


    }else{
        alert("You can't post empty!")
    }
    })
    
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