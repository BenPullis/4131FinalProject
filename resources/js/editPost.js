function editForm(){
    const form = document.getElementById("editPost");

    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const title = form.title.value;
        const content = form.content.value;
        const category = document.querySelector('input[name="team"]:checked').value;
        const id = form.id.value;

        const data = {
            title,
            content,
            category,
            id
        }

        const response = await fetch("/editPost", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if(response.ok){
           window.location.href = `/posts/${id}`;
        }

    })
}

document.addEventListener("DOMContentLoaded", editForm);