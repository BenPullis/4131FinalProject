function postForm(){
    const form = document.getElementById("createPost");

    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        const title = form.title.value;
        const content = form.content.value;
        const category = document.querySelector('input[name="team"]:checked').value;

        const data = {
            title,
            content,
            category
        }

        const response = await fetch("/newPost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if(response.ok){
            window.location.href = `/all/1`;
        }

        form.reset();

    })
}

document.addEventListener("DOMContentLoaded", postForm);