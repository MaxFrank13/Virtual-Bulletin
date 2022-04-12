const group_id = document.querySelector('.group-interface').dataset.id;

const handleBulletinSubmit = async (e) => {
  e.preventDefault();
  const bulletin_name = document.querySelector('#bulletin-name').value.trim();
  
  const response = await fetch(`/bulletin`, {
    method: 'POST',
    body: JSON.stringify({
      bulletin_name,
      group_id
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  const data = await response.json();

  if (response.ok) {
    document.location.replace(`/bulletin/${data.id}`)
  }
};

const handleInvite = async (e) => {
  e.preventDefault();
  const groupName = document.querySelector('section.group-interface h1.title').textContent;
  const email = document.querySelector('#invite-email').value.trim();
  const messageContent = document.querySelector('#message-input').value.trim();

  const response = await fetch(`/api/invitation`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      message: `${groupName} | ${messageContent}`,
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

document
  .querySelector('.bulletin')
  .addEventListener('submit', handleBulletinSubmit);

document
  .querySelector('form.invite-member')
  .addEventListener('submit', handleInvite);

document
  .querySelectorAll('section > button')
  .forEach(form => {
    form.addEventListener('click', toggleForm);
  });