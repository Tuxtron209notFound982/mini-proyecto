const bienvenida = document.querySelector('#bienvenida');
const cerrarSesion = document.querySelector('#cerrarSesion');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#registros');
const claveCompras = "registrosCompras";

/* ---------- Sesión ---------- */

let usuarioActivo;
try {
    usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
} catch {
    usuarioActivo = null;
}

if (!usuarioActivo) {
    window.location.href = "index.html";
} else {
    bienvenida.textContent = usuarioActivo.nombre;
}

cerrarSesion.addEventListener('click', function () {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
});

/* ---------- Compras ---------- */

function leerCompras() {
    try {
        return JSON.parse(localStorage.getItem(claveCompras) || "[]");
    } catch {
        return [];
    }
}

const comprasGuardadas = leerCompras();

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const datos = new FormData(formulario);
    const compra = {};

    for (const [campo, valor] of datos.entries()) {
        compra[campo] = valor.trim();
    }

    // Subtotal calculado a partir de cantidad y valor unitario
    compra.subtotal = (Number(compra.cantidad) * Number(compra.valorUnitario)).toFixed(2);

    const compras = leerCompras();
    compras.push(compra);
    localStorage.setItem(claveCompras, JSON.stringify(compras));

    formulario.reset();
    mostrarCompras(compras);
    alert("Compra registrada exitosamente");
});

function mostrarCompras(compras) {
    resultado.innerHTML = "";

    if (compras.length === 0) {
        const vacio = document.createElement('p');
        vacio.textContent = "Todavía no hay compras registradas.";
        resultado.append(vacio);
        return;
    }

    compras.forEach(function (compra, indice) {
        const bloque = document.createElement('p');
        const lineas = [`Compra ${indice + 1}`];

        for (const campo in compra) {
            lineas.push(`${campo}: ${compra[campo]}`);
        }

        // textContent evita que lo escrito en el formulario se ejecute como HTML
        bloque.textContent = lineas.join(" | ");
        resultado.append(bloque);
    });
}

mostrarCompras(comprasGuardadas);