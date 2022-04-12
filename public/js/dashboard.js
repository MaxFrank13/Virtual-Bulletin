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

const handleBulletinSubmit = async (e) => {
  e.preventDefault();
  const bulletin_name = document.querySelector('#bulletin-name').value.trim();
  const groupName = document.querySelector('#group-verify').value.trim();
  
  const getGroupId = await fetch(`/api/group?${groupName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const { id } = await getGroupId.json();
  
  const postBulletin = await fetch(`/bulletin`, {
    method: 'POST',
    body: JSON.stringify({
      bulletin_name,
      group_id: id
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!postBulletin.ok) {
    console.error('unable to create bulletin');
  }
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

const toggleInviteMessages = (e) => {
  if (e.target.classList.contains('invites'))
  document.querySelector('.messages').classList.toggle('hide');
};

document
  .querySelectorAll('.create')
  .forEach(btn => {
    btn.addEventListener('click', toggleForm);
  });
  
document
  .querySelector('.group')
  .addEventListener('submit', handleGroupSubmit);
  
document
  .querySelector('.bulletin')
  .addEventListener('submit', handleBulletinSubmit);
  
document
  .querySelector('.records-panel')
  .addEventListener('click', handlePanelClick);

document
  .querySelector('.messages-panel')
  .addEventListener('click', toggleInviteMessages);


