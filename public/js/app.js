
// create a input form at that location - simple html form with three textbox inputs
// inputs for header, paragraph (with nested links) and image - provide nexted link syntax to user (i.e [link.URL])
// access inputs from form and assign them to appropriate HTML tags - hX, p, and img tags
// if links are present in paragraph element, turn them into clickable links in the browser - regex or some other method of finding the syntax within user's input
// add click-and-drag functionality to cards so they can be organized by user

(() => {

  // **** Selectors ****

  // interface selectors
  const board = document.querySelector(".board");
  const addBtn = document.querySelector(".add");

  // form selectors
  const form = document.querySelector("form.post");
  const formCloseIcon = document.querySelector(".form-close");
  const cardEditIcons = document.querySelectorAll('i.edit-icon');
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
  let editContent = false;
  let currentCardId;

  const bulletin_id = document.querySelector('section.board').dataset.id;
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
      addBtn.classList.remove("is-light");
      addBtn.textContent = "create new post"
    } else {
      placingContent = true;
      addBtn.classList.add("is-light");
      addBtn.textContent = "cancel"
    };
  });

  // sets listener for each close icon on page load
  setListeners();

  // Form Listeners

  // stops board listener from changing the forms position when the form is clicked

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!editContent) {
      submitPost();
    } else {
      handleCardEdit();
    }

  });

  formCloseIcon.addEventListener('click', function () {
    document
      .querySelectorAll('.bulletin-card')
      .forEach(card => {
        card.classList.remove('hide');
      })
    
    form.classList.add("hide");
    editContent = false;
  });


  // cardEditIcons.forEach(icon => {
  //   icon.addEventListener('click', handleCardEdit);
  // });

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

  async function submitPost() {
    const newCard = document.createElement("div");
    newCard.innerHTML =
      `<div class="icon-container">
          <i class="fas fa-edit edit-icon"></i>
          <i class="fas fa-window-close close-icon"></i>
       </div>
       <div class="content-container">
          <h3 class="card-title">${userHeadingInput.value}</h3>
          <p class="card-body">${userContentInput.value}</p>
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
    
    const response = await fetch('/api/card', {
      method: 'POST',
      body: JSON.stringify({
        header: userHeadingInput.value,
        content: userContentInput.value,
        image: userImageInput.value,
        link: userLinkInput.value,
        position_top: mouseY,
        position_left: mouseX,
        bulletin_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      newCard.setAttribute('data-id', data.id);
      board.appendChild(newCard);
      setListeners();
      reset();
      return;
    } 

    alert('unable to submit post')
  }

  async function handleCardDelete(e) {
    if (confirm('Are you sure you want to delete this card? It will be gone forever!')) {
      const bulletin_id = e.target.parentElement.parentElement.dataset.id;
      const response = await fetch(`/api/card/${bulletin_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('unable to delete item');
      };
    }
  };

  function setListeners() {
    document.querySelectorAll('i.close-icon')
    .forEach(icon => {
      icon.addEventListener('click', handleCardDelete);
    });
    document.querySelectorAll('i.edit-icon')
    .forEach(icon => {
      icon.addEventListener('click', toggleEdit);
    });
  };

  async function toggleEdit(e) {
    const thisCard = e.target.parentElement.parentElement;
    const cardId = thisCard.dataset.id;

    const response = await fetch(`/api/card/${cardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    currentCardId = data.id;

    document
      .querySelectorAll('.bulletin-card')
      .forEach(card => {
        if (card.dataset.id != currentCardId) card.classList.remove('hide');
    })
    
    thisCard.classList.add('hide');
    form.classList.remove('hide');
    form.style.top = `${data.position_top}px`;
    form.style.left = `${data.position_left}px`;
    userHeadingInput.value = data.header;
    userContentInput.value = data.content;
    if (userImageInput) userImageInput.value = data.image;
    if (userLinkInput) userLinkInput.value = data.link;
    editContent = true;
  }

  async function handleCardEdit() {
    const response = await fetch(`/api/card/${currentCardId}`, {
      method: 'PUT',
      body: JSON.stringify({
        header: userHeadingInput.value,
        content: userContentInput.value,
        image: userImageInput.value,
        link: userLinkInput.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('unable to edit item');
    };
  };

})();