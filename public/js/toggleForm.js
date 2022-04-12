const toggleForm = (e) => {
  const thisForm = e.target.nextSibling.nextSibling;
  const btnFunction = e.target.dataset.name;
  if (thisForm.classList.contains('hide')) {
    thisForm.classList.remove('hide');
    e.target.classList.add('is-danger');
    e.target.classList.remove('is-link');
    e.target.textContent = 'X';
    return;
  }
  thisForm.classList.add('hide');
  e.target.classList.add('is-link');
  e.target.classList.remove('is-danger');
  e.target.textContent = btnFunction;
};