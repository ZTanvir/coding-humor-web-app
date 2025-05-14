const allDeletePostBtn = document.querySelectorAll(".delete-post");

if (allDeletePostBtn.length > 0) {
  allDeletePostBtn.forEach((deletePostBtn) => {
    deletePostBtn.addEventListener("click", (e) => {
      console.log("x axis", e.clientX);

      const deletePostDialog = e.currentTarget.lastElementChild;
      const { postid } = deletePostBtn.dataset;
      const confirmDeleteBtn = deletePostDialog.querySelector(".confirm-btn");
      console.log(deletePostDialog.hasAttribute("open"));

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
