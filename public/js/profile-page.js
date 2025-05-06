const dialog = document.querySelector(".membership-riddle");
const dialogOpenBtn = document.querySelector(".dialog-open-btn");
const membershipForm = document.querySelector("#membership-form");
const riddleAnswer = document.querySelector("#riddle_answer");
const errorMsg = document.querySelector(".error-msg");

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

membershipForm.addEventListener("submit", async (e) => {
  const answer = String(riddleAnswer.value).trim().toLowerCase();
  const userId = e.target.dataset.userid;

  if (answer === ";" || answer === "semicolon") {
    // send get request
    errorMsg.textContent = "Correct answer";
    const url = `/profile/${userId}?riddle_answer=true`;
    dialog.close();
    e.target.reset();
    fetch(url);
  } else {
    // add error msg to the screen
    e.preventDefault();
    errorMsg.textContent = "Incorrect answer, please try again.";
    e.target.reset();
  }
});
