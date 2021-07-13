const loginFormHandler = async (event) => {
    event.preventDe3fault();

    //CAPTURE VALUES FROM LOGIN FORM
    const username = document.querySelector('#username-login').value.trim()
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        // SEND A POST REQUEST TO API ENDPOINT
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (respponse.ok) {
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
};

const signupFOrmHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.reaplace('/');
        }
        else {
            alert.apply(response.statusText);
        }
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);