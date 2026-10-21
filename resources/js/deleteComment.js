function deleteComment() {

    const buttons = document.querySelectorAll(".deleteCommentButton");

    buttons.forEach(btn => {
        btn.addEventListener("click", async (event) => {

            const commentId = btn.dataset.id;

            const result = await fetch(`/deleteComment/${commentId}`, {
                method: "DELETE",
            });

            if (result.ok) {
                btn.closest(".singleComment").remove();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", deleteComment);
