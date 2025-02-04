class Comment{
    user_id;
    post_id;
    content;
    constructor(user_id, post_id, content){
        this.user_id = user_id;
        this.post_id = post_id;
        this.content = content;
    }
    async create(){
        let comm = {
            user_id: this.user_id,
            post_id: this.post_id,
            content: this.content
        }
        comm = JSON.stringify(comm);
        const response = await fetch("https://678fd9eb49875e5a1a9399f8.mockapi.io/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: comm,
        });
        const data = await response.json();
        console.log(data)
        return data;
    }
}