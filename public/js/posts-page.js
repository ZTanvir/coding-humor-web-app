const allDeletePostBtn = document.querySelectorAll(".delete-post");

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
