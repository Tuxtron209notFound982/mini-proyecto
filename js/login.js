const form = document.querySelector("#formLogin");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");

function leerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
  } catch {
    return [];
  }
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const usuarios = leerUsuarios();
  const usuarioEncontrado = usuarios.find((usuario) =>
    usuario.correo.toLowerCase() === correo.value.trim().toLowerCase() &&
    usuario.password === password.value
  );

  if (!usuarioEncontrado) {
    alert("Correo o contraseña incorrectos.");
    return;
  }

  localStorage.setItem("usuarioActivo", JSON.stringify({
    nombre: usuarioEncontrado.nombre,
    correo: usuarioEncontrado.correo
  }));
  window.location.href = "inicio.html";
});
