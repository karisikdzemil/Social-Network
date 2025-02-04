class Post{
    constructor(user_id, content, likes){
        this.user_id = user_id;
        this.content = content;
        this.likes = likes;
    }

    async createPost(){
        try{    
            let post = {
                user_id: this.user_id,
                content: this.content,
                likes: this.likes
            }
            post = JSON.stringify(post);
            const response = await fetch("https://678fd9eb49875e5a1a9399f8.mockapi.io/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: post,
            });
            const data = await response.json();
            return data;
        }
        catch{
            new Error("SOMEEETHIIING WEEENTT WRONGGG!!!!");
        }
    }  

    async getPosts() {
        try{
            const response = await fetch("https://678fd9eb49875e5a1a9399f8.mockapi.io/posts")
            const data = await response.json()
            console.log(data);
            return data;
        }
        catch{
            throw Error("Something went wrong!!");
        }
    }
    async deletePost(post_id){
        const response = await fetch("https://678fd9eb49875e5a1a9399f8.mockapi.io/posts/" + post_id, {
            method: "DELETE"
          })
          const data = await response.json();
          return data;
    }
}