const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const password = document.querySelector("#password");
const form = document.querySelector("#formRegistro");

function validarNombre() {
  const valido = nombre.value.trim().length >= 3;
  document.querySelector("#errorNombre").textContent = valido ? "" : "El nombre debe tener mínimo 3 caracteres.";
  return valido;
}

function validarCorreo() {
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());
  document.querySelector("#errorCorreo").textContent = valido ? "" : "Escribe un correo válido.";
  return valido;
}

function validarPassword() {
  const patron = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}/;
  const valido = patron.test(password.value);
  document.querySelector("#errorPassword").textContent = valido ? "" : "Usa mínimo 8 caracteres, mayúscula, minúscula, número y símbolo.";
  return valido;
}

nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
password.addEventListener("input", validarPassword);

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!validarNombre() || !validarCorreo() || !validarPassword()) return;

  let usuarios;
  try {
    usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  } catch {
    usuarios = [];
  }

  const correoNuevo = correo.value.trim().toLowerCase();
  const yaExiste = usuarios.some((usuario) => usuario.correo.toLowerCase() === correoNuevo);
  if (yaExiste) {
    alert("Este correo ya está registrado.");
    return;
  }

  usuarios.push({
    nombre: nombre.value.trim(),
    correo: correo.value.trim(),
    password: password.value
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "index.html";
});
