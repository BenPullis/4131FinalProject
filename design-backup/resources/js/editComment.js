function editForm(){
    const form = document.getElementById("editComment");

    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const content = form.content.value;
        const commentId = form.commentId.value;
        const postId = form.postId.value;

        const data = {
            content,
            commentId
        }

        const response = await fetch("/editComment", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if(response.ok){
           window.location.href = `/comments/${postId}`;
        }

    })
}

document.addEventListener("DOMContentLoaded", editForm);