/* ==========================================================================
   BLOQUE 1: ESTADO GLOBAL Y CONFIGURACIÓN
   ========================================================================== */

// URL de tu Backend Java (Ajusta esto si tu ruta es distinta)
const API_URL = 'http://localhost:8080/productos'; 

// Aquí guardaremos los productos que traigamos de la Base de Datos
const mapaDeProductos = {};

// Diccionario manual para las imágenes (Ya que tu BD no tiene campo de imagen)
// Mapea el "nombre exacto en la BD" con el "archivo en images/"
const diccionarioImagenes = {
    'Hamburguesa': 'images/hamburguesa.png',
    'Pancho': 'images/pancho.png',
    'Milanesa': 'images/milanesa.png',
    'Fideos con tuco': 'images/fideos.png',
    'Tarta de acelga': 'images/tarta.png',
    'Canelones caseros': 'images/canelones.png',
    'Zapallitos rellenos': 'images/zapallitos.png',
    'Bombas de papa': 'images/bombadepapa.png',
    'Rex': 'images/rex.png',
    'Saladix': 'images/saladix.png',
    'Papas Lays': 'images/lays.png',
    'Kesitas': 'images/kesitas.png',
    'Twistos': 'images/twistos.png',
    'Oreo': 'images/oreo.png',
    'Pepitos': 'images/pepitos.png',
    'Chocolinas': 'images/chocolinas.png',
    'Don Satur': 'images/donsatur.png',
    'Formis': 'images/formis.png',
    'Jugo Baggio': 'images/baggio.png',
    'Coca-Cola': 'images/coca.png',
    'Sprite': 'images/sprite.png',
    'Fanta': 'images/fanta.png',
    'Chocolatada Cindor': 'images/cindor.png'
};

let carrito = {}; 
let estaLogueado = false;
let paginaAnterior = 'pagina-principal'; 

/* ==========================================================================
   BLOQUE 2: CONEXIÓN CON EL BACKEND (JAVA)
   ========================================================================== */

/**
 * Función asíncrona que va a buscar los datos a Java
 */
async function obtenerProductosDelBackend() {
    try {
        // 1. Hacemos el pedido a Java
        const respuesta = await fetch(API_URL);
        
        // 2. Si falla (ej: servidor apagado), lanzamos error
        if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor');

        // 3. Convertimos la respuesta a JSON (Lista de productos)
        const listaProductos = await respuesta.json();

        // 4. Procesamos los productos
        procesarProductos(listaProductos);

    } catch (error) {
        console.error("Error cargando productos:", error);
        alert("Error: No se pudieron cargar los productos. Asegúrate que el Backend Java esté corriendo.");
    }
}

/**
 * Toma la lista cruda de Java y la dibuja en la pantalla
 */
function procesarProductos(listaProductos) {
    listaProductos.forEach(producto => {
        // 1. Guardar en nuestro "Índice" (mapa) para búsqueda rápida
        // IMPORTANTE: Tu Java usa 'id' (long), JS lo maneja como número.
        mapaDeProductos[producto.id] = producto;

        // 2. Asignar la imagen usando nuestro diccionario manual
        // Si no encuentra nombre, pone una imagen por defecto (opcional)
        producto.imagenSrc = diccionarioImagenes[producto.nombre] || 'images/mz.png';

        // 3. Decidir en qué contenedor HTML va
        // Usamos el campo 'categoria' que viene de tu BD (ej: "salado", "ofertas")
        // Convertimos a minúscula para asegurar coincidencia (Salado -> salado)
        const categoria = producto.categoria.toLowerCase();
        const idContenedor = `${categoria}-container`; // ej: salado-container
        
        const contenedor = document.getElementById(idContenedor);
        
        // 4. Si el contenedor existe en el HTML, creamos la tarjeta
        if (contenedor) {
            const tarjeta = crearTarjetaProducto(producto);
            contenedor.appendChild(tarjeta);
        }
    });
    
    // Sincronizar UI al final
    actualizarInterfaz();
}


/* ==========================================================================
   BLOQUE 3: LÓGICA DEL CARRITO
   ========================================================================== */

function agregarProductoAlCarrito(productoId) {
    carrito[productoId] = (carrito[productoId] || 0) + 1;
    actualizarInterfaz(); 
}

function quitarProductoDelCarrito(productoId) {
    if (!carrito[productoId]) return; 
    carrito[productoId]--;
    if (carrito[productoId] === 0) {
        delete carrito[productoId]; 
    }
    actualizarInterfaz(); 
}

function actualizarInterfaz() {
    const contenedorCarrito = document.getElementById('cart-items-container');
    const elementoTotal = document.getElementById('cart-total-price');
    
    contenedorCarrito.innerHTML = '';
    let itemsTotales = 0;
    let precioTotal = 0;

    const entradasDelCarrito = Object.entries(carrito); 

    if (entradasDelCarrito.length === 0) {
        contenedorCarrito.innerHTML = '<p class="cart-empty-message">Tu carrito está vacío.</p>';
    } else {
        entradasDelCarrito.forEach(([id, cantidad]) => {
            // Buscamos el producto en el mapa que llenamos desde Java
            const producto = mapaDeProductos[id];
            
            if (producto) { // Verificación de seguridad
                itemsTotales += cantidad;
                precioTotal += producto.precio * cantidad;

                const precioFormateado = `$${(producto.precio * cantidad).toLocaleString('es-AR')}`;
                const itemCarrito = document.createElement('div');
                itemCarrito.className = 'cart-item';
                itemCarrito.dataset.productId = id; 
                itemCarrito.innerHTML = `
                    <img src="${producto.imagenSrc}" alt="${producto.nombre}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${producto.nombre}</h4>
                    </div>
                    <div class="cart-item-controls">
                        <span class="quantity-control" data-accion="remover">-</span>
                        <span class="quantity">${cantidad}</span>
                        <span class="quantity-control" data-accion="agregar">+</span>
                    </div>
                    <p class="cart-item-price">${precioFormateado}</p>
                `;
                contenedorCarrito.appendChild(itemCarrito);
            }
        });
    }

    elementoTotal.textContent = `$${precioTotal.toLocaleString('es-AR')}`;

    // Actualizar contadores en las tarjetas
    document.querySelectorAll('.product-card').forEach(tarjeta => {
        const id = tarjeta.dataset.productId; // Ojo: el dataset suele ser string
        // Convertimos a string para comparar con las claves del objeto carrito
        const elementoCantidad = tarjeta.querySelector('.quantity');
        if (elementoCantidad) {
            elementoCantidad.textContent = carrito[id] || 0;
        }
    });
}

/**
 * Fábrica de tarjetas (Ahora usa los datos de Java)
 */
function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'product-card';
    tarjeta.dataset.productId = producto.id; // ID de la base de datos (Long)

    const precioFormateado = `$${producto.precio.toLocaleString('es-AR')}`;

    tarjeta.innerHTML = `
        <img src="${producto.imagenSrc}" alt="${producto.nombre}" class="product-image">
        <h3 class="product-name">${producto.nombre}</h3>
        <div class="product-details">
            <p class="product-price">${precioFormateado}</p>
            <div class="add-to-cart">
                <span class="quantity-control" data-accion="remover">-</span>
                <span class="quantity">0</span>
                <span class="quantity-control" data-accion="agregar">+</span>
            </div>
        </div>
    `;

    // Oyentes de eventos para los botones
    tarjeta.querySelector('[data-accion="agregar"]').addEventListener('click', (e) => {
        e.stopPropagation();
        agregarProductoAlCarrito(producto.id);
    });
    tarjeta.querySelector('[data-accion="remover"]').addEventListener('click', (e) => {
        e.stopPropagation();
        quitarProductoDelCarrito(producto.id);
    });

    return tarjeta;
}


/* ==========================================================================
   BLOQUE 4: INICIALIZACIÓN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    iniciarNavegacion();
    iniciarModales();
    iniciarCarrito();
    
    // CAMBIO IMPORTANTE:
    // En lugar de dibujar datos estáticos, llamamos al Backend
    obtenerProductosDelBackend();
});

// --- Funciones de Navegación y Modales (Igual que antes) ---

function iniciarNavegacion() {
    document.querySelectorAll('[data-enlace]').forEach(elemento => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault(); 
            evento.stopPropagation();
            let paginaId = elemento.dataset.enlace;
            if (paginaId === 'pagina-anterior') {
                mostrarPagina(paginaAnterior);
            } else {
                mostrarPagina(paginaId);
            }
        });
    });
    mostrarPagina('pagina-principal');
}

function mostrarPagina(paginaId) {
    const paginaActivaActual = document.querySelector('.page.active');
    if (paginaActivaActual) {
        paginaAnterior = paginaActivaActual.id;
    }
    document.querySelectorAll('.page').forEach(p => {
        p.classList.add('hidden');
        p.classList.remove('active');
    });
    const paginaObjetivo = document.getElementById(paginaId) || document.getElementById('pagina-principal');
    paginaObjetivo.classList.remove('hidden');
    paginaObjetivo.classList.add('active');
    window.scrollTo(0, 0); 
    actualizarInterfaz();
}

function iniciarModales() {
    const contenedorModal = document.getElementById('contenedor-modal');
    const iconoUsuario = document.getElementById('icono-usuario');

    function mostrarModal(idModal) {
        document.querySelectorAll('.modal-box').forEach(modal => {
            modal.classList.remove('active');
        });
        document.getElementById(idModal).classList.add('active');
    }

    function ocultarModales() {
        contenedorModal.classList.add('modal-container-hidden');
        contenedorModal.classList.remove('modal-container-visible');
    }

    iconoUsuario.addEventListener('click', () => {
        contenedorModal.classList.add('modal-container-visible');
        contenedorModal.classList.remove('modal-container-hidden');
        mostrarModal('modal-login');
    });

    document.getElementById('fondo-modal').addEventListener('click', ocultarModales);
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', ocultarModales);
    });

    document.querySelectorAll('[data-modal-objetivo]').forEach(link => {
        link.addEventListener('click', (evento) => {
            evento.preventDefault();
            mostrarModal(link.dataset.modalObjetivo);
        });
    });

    document.getElementById('btn-login').addEventListener('click', () => {
        estaLogueado = true;
        ocultarModales();
        iconoUsuario.textContent = '👋';
    });
}

function iniciarCarrito() {
    document.getElementById('btn-vaciar-carrito').addEventListener('click', (evento) => {
        evento.preventDefault();
        carrito = {}; 
        actualizarInterfaz(); 
    });

    document.getElementById('contenedor-items-carrito').addEventListener('click', (evento) => {
        const objetivo = evento.target;
        if (!objetivo.classList.contains('quantity-control')) return;

        const accion = objetivo.dataset.accion;
        const productoId = objetivo.closest('.cart-item').dataset.productId;
        
        if (accion === 'agregar') {
            agregarProductoAlCarrito(productoId);
        } else if (accion === 'remover') {
            quitarProductoDelCarrito(productoId);
        }
    });
}