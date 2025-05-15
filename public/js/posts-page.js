const allDeletePostBtn = document.querySelectorAll(".delete-post");
const postDescriptions = document.querySelector("#post_descriptions");
const postCounter = document.querySelector(".post-text-counter");

if (allDeletePostBtn.length > 0) {
  allDeletePostBtn.forEach((deletePostBtn) => {
    deletePostBtn.addEventListener("click", (e) => {
      const deletePostDialog = e.currentTarget.lastElementChild;
      const { postid } = deletePostBtn.dataset;
      const confirmDeleteBtn = deletePostDialog.querySelector(".confirm-btn");

      //   show the dialog for the specific post
      deletePostDialog.show();

      confirmDeleteBtn.addEventListener("click", async (e) => {
        const response = await fetch(`/posts/delete-post/${postid}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          window.location.reload();
        }
      });
    });
  });
}

if (postDescriptions) {
  postDescriptions.addEventListener("input", (e) => {
    const totalCharacter = String(e.target.value).length;
    if (totalCharacter > 250) {
      postCounter.style.color = "red";
    } else if (totalCharacter <= 250) {
      postCounter.style.color = "white";
    }
    postCounter.textContent = `${String(e.target.value).length}`;
  });
}
