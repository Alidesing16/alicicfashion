// Lista de productos en el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
  const contenedor = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
    totalElement.textContent = "$0";
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = `
      <span>${producto.nombre} - Talla ${producto.talla}</span>
      <span>$${producto.precio}</span>
      <button class="remove-btn" onclick="eliminarProducto(${index})">X</button>
    `;
    contenedor.appendChild(item);
    total += producto.precio;
  });

  totalElement.textContent = `$${total.toLocaleString()}`;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

// Enviar pedido a WhatsApp
document.getElementById("whatsapp-btn").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 😅");
    return;
  }

  const numero = "57xxxxxxxxxx"; // ← tu número de WhatsApp (sin +)
  let mensaje = "🛍️ *Pedido Ali Cic Fashion*%0A%0A";
  let total = 0;

  carrito.forEach((p) => {
    mensaje += `• ${p.nombre} - Talla ${p.talla} - $${p.precio}%0A`;
    total += p.precio;
  });

  mensaje += `%0A💰 *Total:* $${total.toLocaleString()}%0A%0AQuiero hacer este pedido ❤️`;

  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
});

// Cargar al abrir la página
actualizarCarrito();
