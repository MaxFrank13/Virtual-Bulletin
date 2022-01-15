
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
const closeBtn = document.querySelector(".close-btn");
const userHeadingInput = document.getElementById("heading");
const userContentInput = document.getElementById("content");
const userImageInput = document.getElementById("image");

// **** Global Variables ****
let mouseX = null;
let mouseY = null;
let placingContent = false;

// **** Event Listeners ****


// interface listeners

// places form on bulletin at click location
board.addEventListener('click', (e) => {
  console.log(e.offsetX, e.offsetY);
  if (placingContent) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    form.style.top = `${mouseY}px`;
    form.style.left = `${mouseX}px`;
    form.classList.remove("hide");
  }
})

addBtn.addEventListener('click', function(e) {
  if (placingContent) {
    placingContent = false;
    addBtn.classList.remove("active");
  } else {
    placingContent = true;
    addBtn.classList.add("active");
  }
})

// form listeners

// stops board listener from changing the forms position when the form is clicked
form.addEventListener('click', function (e) {
  e.stopPropagation();
});

form.addEventListener('keydown', function (e) {

  if (e.key === "Enter") {
    const newCard = document.createElement("div");
    newCard.innerHTML =
      `<h3>${userHeadingInput.value}</h3>
<p>${userContentInput.value}</p>
<img src=${userImageInput.value} alt="User's image">`;

    newCard.classList.add("bulletin-card");
    newCard.style.top = `${mouseY}px`;
    newCard.style.left = `${mouseX}px`;
    board.appendChild(newCard);
    form.classList.add("hide");
    userHeadingInput.value = "";
    userContentInput.value = "";
    userImageInput.value = "";
  }
});

closeBtn.addEventListener('click', function () {
  form.classList.add("hide");
})

