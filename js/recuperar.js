document.getElementById("verNewPass").addEventListener("change", function () {
    const pass = document.getElementById("newPass");
    pass.type = this.checked ? "text" : "password";
});

document.getElementById("formRecuperar").addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("correoRec").value.trim();
    const newPass = document.getElementById("newPass").value.trim();

    const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if(!regPass.test(newPass)){
        alert("La nueva contraseña no es segura.");
        return;
    }

    const data = localStorage.getItem(correo);
    if(!data){
        alert("No existe una cuenta con ese correo.");
        return;
    }

    const user = JSON.parse(data);

    user.password = newPass;
    user.bloqueado = false;
    user.intentos = 0;

    localStorage.setItem(correo, JSON.stringify(user));

    alert("Contraseña actualizada. Ahora puede iniciar sesión.");
    window.location.href = "login.html";
});