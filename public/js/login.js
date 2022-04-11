// handle log in submit
const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    };
  };
};
// handle new user sign up submit
const handleSignUp = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassowrd = document.querySelector('#password-confirm').value.trim();

  if (password !== confirmPassowrd) return alert("passowrds don't match");

  if (name && email && password && confirmPassowrd) {
    const response = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassowrd }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/bulletin');
    } else {
      alert(response.statusText);
    };
  }
}

document.querySelector('#login')
  .style.opacity = 0.3;

document
  .querySelector('.login')
  .addEventListener('submit', handleLogin);

document
  .querySelector('.sign-up')
  .addEventListener('submit', handleSignUp);


