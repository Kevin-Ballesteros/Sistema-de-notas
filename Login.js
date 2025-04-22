// Función para marcar un campo como inválido (solo borde rojo, sin mensaje)
function marcarComoInvalido(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    }
}

// Función para limpiar estado de validación
function limpiarValidacion(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.remove('is-valid');
    }
}

// Función para validar formato de correo electrónico institucional
function esCorreoInstitucional(correo) {
    return correo.toLowerCase().endsWith('santapacha.edu.co');
}

// Función para validar número de teléfono (10 dígitos)
function esNumeroTelefonoValido(texto) {
    // Eliminar espacios y caracteres no numéricos
    const soloNumeros = texto.replace(/\D/g, '');
    return soloNumeros.length >= 10;
}

// Función para validar el formulario
function validarFormulario() {
    let esValido = true;
    
    // Validar usuario (correo o teléfono)
    const usuario = document.getElementById('usuario').value.trim();
    if (!usuario) {
        marcarComoInvalido('usuario');
        alert('Por favor, ingrese su correo electrónico o número de teléfono.');
        return false; // Detener validación
    } else {
        // Verificar si parece un correo electrónico
        if (usuario.includes('@')) {
            // Es un correo, verificar si es institucional
            if (!esCorreoInstitucional(usuario)) {
                marcarComoInvalido('usuario');
                alert('El correo electrónico debe ser institucional y terminar con santapacha.edu.co');
                return false; // Detener validación
            }
        } 
        // Verificar si parece un número de teléfono
        else if (/\d/.test(usuario)) {
            // Contiene números, verificar longitud
            if (!esNumeroTelefonoValido(usuario)) {
                marcarComoInvalido('usuario');
                alert('El número de teléfono debe tener al menos 10 dígitos.');
                return false; // Detener validación
            }
        }
        limpiarValidacion('usuario');
    }
    
    // Validar contraseña
    const contrasena = document.getElementById('contrasena').value.trim();
    if (!contrasena) {
        marcarComoInvalido('contrasena');
        alert('Por favor, ingrese su contraseña.');
        return false; // Detener validación
    } else if (contrasena.length > 8) {
        marcarComoInvalido('contrasena');
        alert('La contraseña debe tener máximo 8 caracteres.');
        return false; // Detener validación
    } else {
        limpiarValidacion('contrasena');
    }
    
    // Validar términos y condiciones
    const terminos = document.getElementById('terminos');
    if (!terminos.checked) {
        terminos.classList.add('is-invalid');
        alert('Debe aceptar los términos y condiciones para continuar.');
        return false; // Detener validación
    } else {
        terminos.classList.remove('is-invalid');
    }
    
    return true;
}

// Función para simular el inicio de sesión
function simularInicioSesion() {
    const loginButton = document.getElementById('loginButton');
    const btnText = loginButton.querySelector('.btn-text');
    const spinner = loginButton.querySelector('.spinner-border');
    
    // Mostrar spinner y cambiar texto
    btnText.textContent = 'Iniciando sesión...';
    spinner.classList.remove('d-none');
    loginButton.disabled = true;
    
    // Simular proceso de inicio de sesión
    setTimeout(function() {
        // Ocultar spinner y restaurar botón
        btnText.textContent = 'Iniciar Sesión';
        spinner.classList.add('d-none');
        loginButton.disabled = false;
        
        // Mostrar alerta de éxito
        alert('¡Inicio de sesión exitoso! Bienvenido al Sistema de Gestión de Calificaciones del Colegio Santa Pacha.');
        
        // Redirigir a la página principal (en un caso real)
        // window.location.href = 'dashboard.html';
    }, 1500);
}

// Evento para mostrar/ocultar contraseña
document.querySelector('.password-toggle').addEventListener('click', function() {
    const passwordInput = document.getElementById('contrasena');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Evento para validar el formulario al enviar
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validar formulario
    const esValido = validarFormulario();
    
    if (esValido) {
        simularInicioSesion();
    }
});

// Limpiar validación al escribir en los campos
document.getElementById('usuario').addEventListener('input', function() {
    if (this.value.trim()) {
        limpiarValidacion('usuario');
    }
});

document.getElementById('contrasena').addEventListener('input', function() {
    if (this.value.trim()) {
        limpiarValidacion('contrasena');
    }
});

// Limpiar validación de términos al cambiar el checkbox
document.getElementById('terminos').addEventListener('change', function() {
    if (this.checked) {
        this.classList.remove('is-invalid');
    }
});