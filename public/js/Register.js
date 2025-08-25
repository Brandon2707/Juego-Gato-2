document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("NombreRe").value.trim();
    const password = document.getElementById("ContraseñaRe").value.trim();

    // Validación: campos obligatorios
    if (!username || !password) {
        alert("Por favor llena todos los campos");
        return;
    }

    // Creamos el objeto usuario
    const user = { username, password };

    // Guardamos en localStorage (como JSON)
    localStorage.setItem("user", JSON.stringify(user));

    alert("Usuario registrado con éxito ✅");

    // Redirige al login
    window.location.href = "../pages/LoginRevi.html"
});
