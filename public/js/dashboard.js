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
  
  const getGroupId = await fetch(`/group/getId/${groupName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const id = await getGroupId.json();
  
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

  const bulletin = await postBulletin.json();
  
  if (postBulletin.ok) {
    document.location.replace(`/bulletin/${bulletin.id}`)
  }

  console.error('unable to create bulletin');
};


const handleInviteResponse = async (e) => {
  let user_accepted;
  if (e.target.classList.contains('fa-circle-check')) {
    user_accepted = true;
  } else if (e.target.classList.contains('fa-circle-xmark')) {
    user_accepted = false;
  } else {
    return;
  }
  const id = e.target.parentElement.parentElement.dataset.id;
  const group_id = e.target.parentElement.parentElement.dataset.group_id;
  const response = await fetch(`/api/invitation/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      user_accepted,
      group_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.reload();
  };
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

document
  .querySelector('.messages-panel')
  .addEventListener('click', handleInviteResponse);


