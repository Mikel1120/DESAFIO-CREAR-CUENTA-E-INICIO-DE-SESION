document.getElementById("verPassLogin").addEventListener("change", function () {
    const pass = document.getElementById("passwordLogin");
    pass.type = this.checked ? "text" : "password";
});

document.getElementById("formLogin").addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("correoLogin").value.trim();
    const pass = document.getElementById("passwordLogin").value.trim();
    const msg = document.getElementById("mensaje");

    const data = localStorage.getItem(correo);

    if(!data){
        msg.textContent = "Usuario o contraseña incorrectos.";
        return;
    }

    const user = JSON.parse(data);

    if(user.bloqueado){
        msg.textContent = "Cuenta bloqueada por intentos fallidos.";
        return;
    }

    if(pass === user.password){
        user.intentos = 0;
        localStorage.setItem(correo, JSON.stringify(user));
        msg.textContent = `Bienvenido al sistema, ${user.nombre}`;
    } else {
        user.intentos++;
        if(user.intentos >= 3){
            user.bloqueado = true;
            msg.textContent = "Cuenta bloqueada por intentos fallidos.";
        } else {
            msg.textContent = "Usuario o contraseña incorrectos.";
        }
        localStorage.setItem(correo, JSON.stringify(user));
    }
});