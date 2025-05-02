const dialog = document.querySelector(".membership-riddle");
const dialogOpenBtn = document.querySelector(".dialog-open-btn");

dialogOpenBtn.addEventListener("click", (e) => {
  dialog.showModal();
});

dialog.addEventListener("click", (e) => {
  const dialogDimension = dialog.getBoundingClientRect();

  if (
    e.clientX < dialogDimension.left ||
    e.clientY < dialogDimension.top ||
    e.clientX > dialogDimension.right ||
    e.clientY > dialogDimension.bottom
  ) {
    dialog.close();
  }
});
