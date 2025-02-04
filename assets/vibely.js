const changeUsername = document.getElementById("change-username");
const cahngeEmail = document.getElementById("change-email");
const changePass = document.getElementById("change-password");
const ul = document.getElementById("posts");


let session = new Session();
session = session.getSession();

let globalUser;


if(session !== ""){
    // location.href = "/vibely.html";
    const getUser = async () =>{
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
            let removePostBtn = '';
            if(session === el.user_id){
             removePostBtn = '<button class="remove-post-btn">Remove</button>';
            }
            ul.innerHTML += `
            <li class="single-post" data-post_id="${el.id}">
             <div class="post-content">
                 <p>${el.content}</p>
             </div>
             <div class="post-actions">
                 <p>Author: <span>${user.username}</span></p>

                 <div class="post-buttons">
                    <span> <button class="post-btn"><i class="fa-solid fa-thumbs-up"></i></button> <p>${el.likes} likes</p></span>
                     <span><button class="post-btn"><i class="fa-solid fa-comment"></i></button> <p>comments</p></span>
                     ${removePostBtn}
                 </div>
             </div>
         </li>
     `;
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
        ul.innerHTML = `
              <li class="single-post" data-post_id="${post.id}">
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

        ` + ul.innerHTML;


    }else{
        alert("You can't post empty!")
    }
    })

    ul.addEventListener("click", (event) => {
        if(event.target.textContent === "Remove"){
            const targetLi = event.target.closest("LI");
            const postId = targetLi.getAttribute("data-post_id");
            const post = new Post();
            post.deletePost(postId);
            targetLi.remove();
        }
    });

    const commentPostHandler = () => {

    }

    ul.addEventListener("click", (event) => {
        const li = event.target.closest("LI");
        const spanTags = li.querySelectorAll(".post-buttons span");
        // console.log(spanTags[0])
        if(event.target.closest("span") === spanTags[0]){
            console.log("like");
        }
         if(event.target.closest("span") === spanTags[1]){
            commentPostHandler();
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