document.getElementById("login-form").addEventListener('submit', function (event) {
    let emailText = document.getElementById('email').value;
    let passwordText = document.getElementById('password').value;

    if (emailText.length === 0) {
        event.preventDefault();

        document.getElementById('email').style.borderColor = "red";
        
        let emailM = document.getElementById('email-message');
        emailM.innerHTML = 'Ingresa tu email';
    }

    else if (passwordText.length === 0) {
        event.preventDefault();

        document.getElementById('password').style.borderColor = "red";
        
        let passwordM = document.getElementById('password-message');
        passwordM.innerHTML = 'Ingresa tu contraseña';
    } else {
        event.preventDefault();
        window.location.href = 'home.html';
    }
});