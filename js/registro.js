document.getElementById("verPass").addEventListener("change", function () {
    const pass = document.getElementById("password");
    pass.type = this.checked ? "text" : "password";
});

document.getElementById("formRegistro").addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const movil = document.getElementById("movil").value.trim();
    const password = document.getElementById("password").value.trim();

    // REGEX
    const regNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
    const regCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regMovil = /^[0-9]{7,12}$/;
    const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if(!regNombre.test(nombre)) return alert("Nombre inválido");
    if(!regCorreo.test(correo)) return alert("Correo inválido");
    if(!regMovil.test(movil)) return alert("Número móvil inválido");
    if(!regPass.test(password)) return alert("Contraseña insegura");

    const usuario = {
        nombre,
        correo,
        movil,
        password,
        intentos: 0,
        bloqueado: false
    };

    localStorage.setItem(correo, JSON.stringify(usuario));

    alert("Usuario registrado correctamente.");
    window.location.href = "login.html";
});