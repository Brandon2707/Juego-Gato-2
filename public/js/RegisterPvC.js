document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault(); 
  const username = document.getElementById("NombreRePvc").value.trim();
  const password = document.getElementById("ContraseñaRePvc").value.trim();

  // Validación: campos obligatorios
  if (!username || !password) {
    alert("Por favor llena todos los campos");
    return;
  }
  // Obtenemos la lista de usuarios de localStorage o la creamos si no existe
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Validamos que no exista ya ese nombre
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    alert("Ese usuario ya está registrado ❌");
    return;
  }

  // Agregamos el nuevo usuario
  users.push({ username, password });

  // Guardamos la lista actualizada en localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Usuario registrado con éxito ✅");

  // Redirige al login
  window.location.href= "../pages/LoginPvC.html"
});
