const allDeletePostBtn = document.querySelectorAll(".delete-post");

if (allDeletePostBtn.length > 0) {
  allDeletePostBtn.forEach((deletePostBtn) => {
    deletePostBtn.addEventListener("click", (e) => {
      const deletePostDialog = e.currentTarget.lastElementChild;
      //   show the dialog for the specific post
      deletePostDialog.show();
    });
  });
}
