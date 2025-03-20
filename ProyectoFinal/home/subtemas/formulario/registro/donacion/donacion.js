var form = document.getElementById('formulario');
var errorBox = document.getElementById('errorBox');
var errorMessages = document.getElementById('errorMessages');
var closeErrorBox = document.getElementById('closeErrorBox');
var submitButton = document.getElementById("enviar");

// Función de validación para el nombre
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

// Función de validación para el número de teléfono
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

// Función de validación para el monto
function validarMonto() {
    let monto = document.getElementById('amount').value.trim();
    if (monto === '') {
        return "El campo de monto está vacío.";
    }
    if (isNaN(monto) || parseFloat(monto) <= 0) {
        return "El monto debe ser un número válido mayor que 0.";
    }
    return null;
}

// Función de validación para la CLABE
function validarClabe() {
    let clabe = document.getElementById('clabe').value.trim();
    if (clabe === '') {
        return "El campo de CLABE está vacío.";
    }
    if (clabe.length !== 18 || isNaN(clabe)) {
        return "La CLABE debe tener exactamente 18 dígitos numéricos.";
    }
    return null;
}

// Función de validación para la expiración
function validarExpiracion() {
    let expiracion = document.getElementById('expiration').value.trim();
    let regexExpiracion = /^(0[1-9]|1[0-2])\/(\d{2})$/; // Expresión para verificar el formato MM/AA
    
    // Verifica si el campo está vacío
    if (expiracion === '') {
        return "El campo de expiración está vacío.";
    }

    // Verifica si el formato no coincide con MM/AA
    if (!regexExpiracion.test(expiracion)) {
        document.getElementById('expiration').focus();  
        return "El formato de expiración debe ser MM/AA.";
    }
    
    return null;
}

// Función de validación para el CVV
function validarCvv() {
    let cvv = document.getElementById('cvv').value.trim();
    if (cvv === '') {
        return "El campo de CVV está vacío.";
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
        return "El CVV debe tener exactamente 3 dígitos numéricos.";
    }
    return null;
}

// Función de validación para la comunidad seleccionada
function validarComunidad() {
    let comunidadSeleccionada = document.querySelector('input[name="community"]:checked');
    if (!comunidadSeleccionada) {
        return "Debe seleccionar una comunidad destinada.";
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

// Evento para el envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let errores = [];
    let errorNombre = validarNombre();
    if (errorNombre) { errores.push(errorNombre); }

    let errorNumero = validarNumero();
    if (errorNumero) { errores.push(errorNumero); }

    let errorMonto = validarMonto();
    if (errorMonto) { errores.push(errorMonto); }

    let errorClabe = validarClabe();
    if (errorClabe) { errores.push(errorClabe); }

    let errorExpiracion = validarExpiracion();
    if (errorExpiracion) { errores.push(errorExpiracion); }

    let errorCvv = validarCvv();
    if (errorCvv) { errores.push(errorCvv); }

    let errorComunidad = validarComunidad();
    if (errorComunidad) { errores.push(errorComunidad); }

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


// Evento para cerrar el cuadro de error
closeErrorBox.addEventListener('click', ocultarErrorBox);
