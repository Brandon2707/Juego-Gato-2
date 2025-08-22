document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const loginUser = document.getElementById("NombreP2").value.trim();
  const loginPass = document.getElementById("ContraseñaP2").value.trim();


  if (!loginUser || !loginPass) {
    alert("Por favor completa todos los campos");
    return;
  }


  // Obtenemos la lista de usuarios de localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Buscamos si el usuario existe
  const foundUser = users.find(user => user.username === loginUser && user.password === loginPass);

  if (!foundUser) {
    alert("Usuario o contraseña incorrectos ❌");
    return;
  }

  // Verificamos jugadores ya logeados en sessionStorage
  let player1 = sessionStorage.getItem("player1");
  let player2 = sessionStorage.getItem("player2");

  if (!player1) {
    sessionStorage.setItem("player1", loginUser);
    alert(`Bienvenido ${loginUser}, eres el Jugador 1 🥇`);
  } else if (!player2 && player1 !== loginUser) {
    sessionStorage.setItem("player2", loginUser);
    alert(`Bienvenido ${loginUser}, eres el Jugador 2 🥈`);
  } else if (player1 === loginUser || player2 === loginUser) {
    alert(`Ya estabas logueado como ${player1 === loginUser ? "Jugador 1" : "Jugador 2"}`);
  } else {
    alert("Ya hay 2 jugadores logueados ❌");
    return;
  }

    // Redirige al juego o página principal
    window.location.href = "../pages/PvC.html"; 

    });