function commentForm(){
    const form = document.getElementById("createComment");

    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const name = form.name.value;
        const content = form.content.value;
        const postId = form.postId.value

        const data = {
            name,
            content,
            postId
        }

        const response = await fetch("/newComment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        form.reset();
    })
}

document.addEventListener("DOMContentLoaded", commentForm);