// Generar un ID único de cliente
function generarIdCliente() {
    let prefijo = "APC";
    let numero = Math.floor(10000 + Math.random() * 90000);
    let fecha = new Date();
    let mes = String(fecha.getMonth() + 1).padStart(2, "0");
    let dia = String(fecha.getDate()).padStart(2, "0");
    document.getElementById("idCliente").value = `${prefijo}-${numero}-${mes}${dia}`;
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    generarIdCliente();
    let heroButton = document.querySelector(".btn-hero");
    if (heroButton) {
        heroButton.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(heroButton.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
        });
    }
});

// Obtener datos del formulario
function obtenerDatosFormulario() {
    return {
        idCliente: document.getElementById("idCliente").value,
        email: document.getElementById("email").value,
        equipos: +document.getElementById("equipos").value,
        dias: +document.getElementById("dias").value,
        diasExtra: +document.getElementById("diasExtra").value,
        opcion: document.getElementById("opcion").value
    };
}

// Validar equipos y correo
function validarDatos(equipos, email) {
    if (equipos < 2) {
        alert("Debes alquilar mínimo 2 equipos.");
        return false;
    }
    if (email && !validarEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }
    return true;
}

// Validación simple de email
function validarEmail(email) {
    return email.includes("@") && email.includes(".");
}

// Cálculos de valores
function calcularValorBase(equipos, dias) {
    return equipos * dias * 35000;
}

function calcularAjuste(valorBase, opcion) {
    return opcion === "fuera" ? valorBase * 0.05
         : opcion === "local" ? -valorBase * 0.05
         : 0;
}

function calcularDiasExtra(equipos, diasExtra, diasIniciales) {
    let valor = equipos * diasExtra * 35000;
    let descuento = diasExtra <= 3 ? 0.02 : diasExtra <= 7 ? 0.03 : diasExtra <= 15 ? 0.04 : 0.05;
    if (diasIniciales > 10) descuento /= 2;
    return { 
        valorDiasExtra: valor - valor * descuento, 
        porcentajeDescuento: descuento * 100 
    };
}

// Texto descriptivo según la opción
function obtenerTextoOpcion(opcion) {
    return opcion === "ciudad" ? "Dentro de la ciudad" :
           opcion === "fuera" ? "Fuera de la ciudad (5% de cargo)" :
           opcion === "local" ? "Dentro del local (5% de descuento)" :
           "Desconocido";
}

// Mostrar resultado
function mostrarResultado(datos) {
    let htmlResultado = `
        <h3>Factura generada</h3>
        <p><strong>ID Cliente:</strong> ${datos.idCliente}</p>
        <p><strong>Fecha y hora:</strong> ${datos.fechaHora}</p>
        <p><strong>Opción de alquiler:</strong> ${datos.opcionTexto}</p>
        <p><strong>Equipos:</strong> ${datos.equipos}</p>
        <p><strong>Días iniciales:</strong> ${datos.dias}</p>
        <p><strong>Días adicionales:</strong> ${datos.diasExtra}</p>
        <p><strong>Valor base:</strong> $${datos.valorBase.toLocaleString()}</p>
    `;
    if (datos.ajuste) {
        htmlResultado += `<p><strong>${datos.ajuste > 0 ? "Cargo por domicilio" : "Descuento en local"}:</strong> $${Math.abs(datos.ajuste).toLocaleString()}</p>`;
    }
    if (datos.diasExtra > 0) {
        htmlResultado += `<p><strong>Valor días adicionales:</strong> $${datos.valorDiasExtra.toLocaleString()} (Descuento ${datos.porcentajeDescuento}%)</p>`;
    }
    htmlResultado += `<h2>Total a pagar: $${datos.valorTotal.toLocaleString()}</h2>`;
    document.getElementById("resultado").innerHTML = htmlResultado;
}

// Calcular la factura
function calcularFactura() {
    let { idCliente, email, equipos, dias, diasExtra, opcion } = obtenerDatosFormulario();
    if (!validarDatos(equipos, email)) return;

    let valorBase = calcularValorBase(equipos, dias);
    let ajuste = calcularAjuste(valorBase, opcion);
    let { valorDiasExtra, porcentajeDescuento } = calcularDiasExtra(equipos, diasExtra, dias);
    let valorTotal = valorBase + ajuste + valorDiasExtra;

    mostrarResultado({
        idCliente, equipos, dias, diasExtra, valorBase, ajuste,
        valorDiasExtra, porcentajeDescuento, valorTotal,
        opcionTexto: obtenerTextoOpcion(opcion),
        fechaHora: new Date().toLocaleString()
    });
}

// Simular envío de factura
function enviarFactura() {
    let email = document.getElementById("email").value;
    if (!email || !validarEmail(email)) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }
    if (!document.getElementById("resultado").innerHTML.trim()) {
        alert("Primero debes calcular la factura.");
        return;
    }
    alert("La factura ha sido enviada exitosamente a " + email);
}