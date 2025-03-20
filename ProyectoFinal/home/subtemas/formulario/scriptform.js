var form = document.getElementById('formulario');
var errorBox = document.getElementById('errorBox');
var errorMessages = document.getElementById('errorMessages');
var closeErrorBox = document.getElementById('closeErrorBox');
var submitButton = document.getElementById("enviar");

// Validaciones
function validarNombre() {
    let nombre = document.getElementById('name').value.trim();
    if (nombre === '') {
        return "El campo de nombre está vacío.";
    }
    if (nombre.length > 50) {
        return "El nombre no debe superar los 50 caracteres.";
    }
    return null;
}

function validarEmail() {
    let email = document.getElementById('email').value.trim();
    if (email === '') {
        return "El campo de email está vacío.";
    }
    if (email.length > 50) {
        return "El email no debe superar los 50 caracteres.";
    }
    return null;
}

function validarNumero() {
    let numero = document.getElementById('phone').value.trim();
    if (numero === '') {
        return "El campo de teléfono está vacío.";
    }
    if (numero.length !== 10) {
        return "El teléfono debe contener exactamente 10 dígitos numéricos.";
    }
    if (!/^\d{10}$/.test(numero)) {
        return "El teléfono debe contener solo números.";
    }
    return null;
}

function mostrarErrores(errores) {
    errorMessages.innerHTML = ''; // se limpian los mensajes previos :<
    errores.forEach((error) => {
        let li = document.createElement('li');
        li.textContent = error;
        errorMessages.appendChild(li);
    });
    errorBox.classList.remove('hidden');
    errorBox.classList.add('visible');
}

function ocultarErrorBox() {
    errorBox.classList.remove('visible');
    setTimeout(function () {
        submitButton.classList.remove("nonactive");
        submitButton.classList.add("normal"); 
    }, 1000);
    errorBox.classList.add('hidden');
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let errores = [];
    let errorNombre = validarNombre();
    if (errorNombre) { errores.push(errorNombre); }

    let errorEmail = validarEmail();
    if (errorEmail) { errores.push(errorEmail); }

    let errorNumero = validarNumero();
    if (errorNumero) { errores.push(errorNumero); }

    if (errores.length > 0) {
        mostrarErrores(errores);
        submitButton.classList.add("nonactive");
    } else {
        submitButton.classList.add("active");
        ocultarErrorBox();
        setTimeout(function () {
            form.submit(); 
        }, 1000);
    }
});

closeErrorBox.addEventListener('click', ocultarErrorBox);