const toggleForm = (e) => {
  e.stopPropagation();
  const thisForm = e.target.nextSibling.nextSibling;
  const btnFunction = e.target.dataset.name;
  if (thisForm.classList.contains('hide')) {
    thisForm.classList.remove('hide');
    e.target.classList.add('is-danger');
    e.target.classList.remove('is-link');
    e.target.innerHTML = '🗕';
    return;
  }
  thisForm.classList.add('hide');
  e.target.classList.add('is-link');
  e.target.classList.remove('is-danger');
  e.target.innerHTML = btnFunction;
};

const handlePanelClick = async (e) => {
  const id = e.target.dataset.id;
  const type = e.target.dataset.type;

  switch(type) {
    case 'group':
      document.location.replace(`/group/${id}`);
      break;
    case 'bulletin':
      document.location.replace(`/bulletin/${id}`);
      break;
    default: 
  }
};