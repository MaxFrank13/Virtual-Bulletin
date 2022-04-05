
// create a input form at that location - simple html form with three textbox inputs
// inputs for header, paragraph (with nested links) and image - provide nexted link syntax to user (i.e [link.URL])
// access inputs from form and assign them to appropriate HTML tags - hX, p, and img tags
// if links are present in paragraph element, turn them into clickable links in the browser - regex or some other method of finding the syntax within user's input
// add click-and-drag functionality to cards so they can be organized by user

// **** Selectors ****

// interface selectors
const board = document.querySelector(".board");
const addBtn = document.querySelector(".add");

// form selectors
const form = document.querySelector("form");
const formCloseIcon = document.querySelector(".form-close");
const linkIcon = document.querySelector(".link-icon");
const cameraIcon = document.querySelector(".camera-icon");
const userHeadingInput = document.getElementById("heading");
const userContentInput = document.getElementById("content");
const userImageInput = document.getElementById("image");
const userLinkInput = document.getElementById("link");

// **** Global Variables ****
let mouseX = null;
let mouseY = null;
let placingContent = false;

// **** Event Listeners ****


// interface listeners

// places form on bulletin at click location
board.addEventListener('click', (e) => {
  if (placingContent && e.target === board) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    form.style.top = `${mouseY}px`;
    form.style.left = `${mouseX - 50}px`;
    form.classList.remove("hide");
  };
});

addBtn.addEventListener('click', function (e) {
  if (placingContent) {
    placingContent = false;
    addBtn.classList.remove("active");
  } else {
    placingContent = true;
    addBtn.classList.add("active");
  };
});

// form listeners

// stops board listener from changing the forms position when the form is clicked

form.addEventListener('keydown', function (e) {

  if (e.key === "Enter") {
    const newCard = document.createElement("div");
    newCard.innerHTML =
      `<div class="icon-container">
          <i class="fas fa-edit"></i>
          <i class="fas fa-window-minimize"></i>
          <i class="fas fa-window-close close-icon"></i>
       </div>
       <div class="content-container">
          <h3>${userHeadingInput.value}</h3>
          <p>${userContentInput.value}</p>
       </div>`;
    if (userLinkInput.value) {
      let newLink = document.createElement("a");
      newLink.href = userLinkInput.value;
      newLink.textContent = "link";
      newLink.target = "_blank";
      newCard.appendChild(newLink);
    };
    if (userImageInput.value) {
      let newImage = document.createElement("img");
      newImage.src = userImageInput.value;
      newImage.alt = "user input";
      newCard.appendChild(newImage);
    };
    newCard.classList.add("bulletin-card");
    newCard.style.top = `${mouseY}px`;
    newCard.style.left = `${mouseX - 50}px`;
    
    // ****

    // add card to database for this user/group
    
    // ****
    board.appendChild(newCard);
    reset();
  }
});

formCloseIcon.addEventListener('click', function () {
  form.classList.add("hide");
});

linkIcon.addEventListener("click", function () {
  let linkBoxHeight = userLinkInput.style.height;
  if (linkBoxHeight === "2.5rem") {
    linkBoxHeight = 0;
    userLinkInput.style.visibility = "hidden";
    userLinkInput.style.marginTop = "0";
  } else {
    linkBoxHeight = "2.5rem";
    userLinkInput.style.visibility = "visible";
    userLinkInput.style.marginTop = "1rem";
  };
  userLinkInput.style.height = linkBoxHeight;
});

cameraIcon.addEventListener("click", function () {
  let imageBoxHeight = userImageInput.style.height;
  if (imageBoxHeight === "2.5rem") {
    imageBoxHeight = 0;
    userImageInput.style.visibility = "hidden";
    userImageInput.style.marginTop = "0";
  } else {
    imageBoxHeight = "2.5rem";
    userImageInput.style.visibility = "visible";
    userImageInput.style.marginTop = "1rem";
  };
  userImageInput.style.height = imageBoxHeight;
});

function reset() {
  form.classList.add("hide");
  userHeadingInput.value = "";
  userContentInput.value = "";
  userLinkInput.value = "";
  userImageInput.value = "";
};