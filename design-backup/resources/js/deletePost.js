function deletePost(){
    const btn = document.getElementById("deletePostButton");
    const id = btn.dataset.id;

    btn.addEventListener("click", async(event) => {

        const result = await fetch(`/deletePost/${id}`, {
            method: "DELETE",
        })

        if (result.ok){
            window.location.href = "/deleteOk";
        }
    });
}

document.addEventListener("DOMContentLoaded", deletePost);