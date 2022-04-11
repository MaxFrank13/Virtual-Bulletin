const groupForm = document.querySelector('.group');

// add handle function for bulletin form
const bulletinForm = document.querySelector('.bulletin');

const toggleForm = (e) => {
  const thisForm = e.target.nextSibling.nextSibling;
  const btnFunction = e.target.dataset.name;
  if (e.target.textContent === 'Create new group' ||
      e.target.textContent === 'Create new bulletin'  
  ) {
    thisForm.classList.remove('hide');
    e.target.classList.add('is-danger');
    e.target.classList.remove('is-link');
    e.target.textContent = 'X';
    return;
  }
  thisForm.classList.add('hide');
  e.target.classList.add('is-link');
  e.target.classList.remove('is-danger');
  e.target.textContent = `Create new ${btnFunction}`
};

const handleGroupSubmit = async (e) => {
  e.preventDefault();
  const groupName = document.querySelector('#group-name').value.trim();

  const response = await fetch('/group', {
    method: 'POST',
    body: JSON.stringify({
      group_name: groupName,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const {newGroup} = await response.json();

  if (response.ok) {
    return document.location.replace(`/group/${newGroup.id}`);
  }
  alert('name already in use');
};

document
  .querySelectorAll('.create')
  .forEach(btn => {
    btn.addEventListener('click', toggleForm);
  });

document
  .querySelector('.group')
  .addEventListener('submit', handleGroupSubmit);