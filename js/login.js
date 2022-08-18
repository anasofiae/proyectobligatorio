document.getElementById("login-form").addEventListener('submit', function (event) {
    let emailText = document.getElementById('email').value;
    let passwordText = document.getElementById('password').value;

    if (emailText.length === 0) {
        event.preventDefault();

        let emailM = document.getElementById('email-message');
        emailM.innerHTML = 'Ingresa tu email';
    }

    else if (passwordText.length === 0) {
        event.preventDefault();

        let passwordM = document.getElementById('password-message');
        passwordM.innerHTML = 'Ingresa tu contraseña';
    } else {
        event.preventDefault();
        window.location.href = 'home.html';
    }
});