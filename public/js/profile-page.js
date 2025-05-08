const dialog = document.querySelector(".membership-riddle");
const dialogOpenBtn = document.querySelector(".dialog-open-btn");
const membershipForm = document.querySelector("#membership-form");
const riddleAnswer = document.querySelector("#riddle_answer");
const errorMsg = document.querySelector(".error-msg");
const membershipApproveBtn = document.querySelector(".member-btn-approve");
const membershipDenyBtn = document.querySelector(".member-btn-deny");

if (dialogOpenBtn) {
  // this btn will be hide when user already send membership upgrade request.
  dialogOpenBtn.addEventListener("click", (e) => {
    dialog.showModal();
  });
}

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

if (membershipApproveBtn) {
  // add event listener when the user is an admin
  membershipApproveBtn.addEventListener("click", async (e) => {
    console.log("Approve request");
    const [userId, userName] = String(e.target.dataset.member).split(";");
    const response = await fetch("/profile/update-membership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, userName }),
    });
    // refresh on user membership status update
    if (response.status === 200) {
      window.location.reload();
    }
  });
}
if (membershipDenyBtn) {
  // add event listener when the user is an admin
  membershipDenyBtn.addEventListener("click", () => {
    console.log("Deny request");
  });
}
