document.getElementById("statsForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Obtener usuarios registrados
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Buscar al usuario
  const foundUser = users.find(user => user.username === username && user.password === password);
  console.log(foundUser);
  

  if (!foundUser) {
    alert("Usuario o contraseña incorrectos ❌");
    return;
  }

  // Mostrar estadísticas
  document.getElementById("statsContainer").style.display = "block";
  document.getElementById("userTitle").textContent = `Estadísticas de ${foundUser.username}`;
  document.getElementById("wins").textContent = foundUser.stats.victorias;
  document.getElementById("losses").textContent = foundUser.stats.derrotas;
  document.getElementById("draws").textContent = foundUser.stats.empates;
});
