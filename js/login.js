document.getElementById("login-form").addEventListener('submit', function (event) {
    let emailText = document.getElementById('email').value;
    let passwordText = document.getElementById('password').value;

    if (emailText.length === 0) {
        event.preventDefault();
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('email-message').innerHTML = 'Ingresa tu email'; 
    }

    else if (passwordText.length === 0) {
        event.preventDefault();
        document.getElementById('password').style.borderColor = "red";
        document.getElementById('password-message').innerHTML = 'Ingresa tu contraseña';
    } else {
        event.preventDefault();
        window.location.href = 'home.html';
    }
});