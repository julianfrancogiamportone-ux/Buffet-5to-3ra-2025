const baseDeDatosProductos = {
    ofertas: [
        { id: 'hamburguesa', name: 'Hamburguesa', price: 4000, image: 'images/hamburguesa.png', alt: 'Hamburguesa' },
        { id: 'pancho', name: 'Pancho', price: 1500, image: 'images/pancho.png', alt: 'Pancho' },
        { id: 'milanesa', name: 'Milanesa', price: 6000, image: 'images/milanesa.png', alt: 'Milanesa' }
    ],
    menuSemanal: [
        { id: 'fideos', name: 'Fideos con tuco', price: 4000, image: 'images/fideos.png', alt: 'Fideos con tuco' },
        { id: 'tarta-acelga', name: 'Tarta de acelga', price: 5500, image: 'images/tarta.png', alt: 'Tarta de acelga' },
        { id: 'canelones', name: 'Canelones caseros', price: 6500, image: 'images/canelones.png', alt: 'Canelones caseros' },
        { id: 'zapallitos', name: 'Zapallitos rellenos', price: 4000, image: 'images/zapallitos.png', alt: 'Zapallitos rellenos' },
        { id: 'bombas-papa', name: 'Bombas de papa', price: 6500, image: 'images/bombadepapa.png', alt: 'Bombas de papa' }
    ],
    salado: [
        { id: 'rex', name: 'Rex', price: 1500, image: 'images/rex.png', alt: 'Galletitas Rex' },
        { id: 'saladiix', name: 'Saladix', price: 1800, image: 'images/saladix.png', alt: 'Galletitas Saladix' },
        { id: 'papas-lays', name: 'Papas Lays', price: 2500, image: 'images/lays.png', alt: 'Papas Lays' },
        { id: 'kesitas', name: 'Kesitas', price: 1800, image: 'images/kesitas.png', alt: 'Kesitas' },
        { id: 'twistos', name: 'Twistos', price: 2200, image: 'images/twistos.png', alt: 'Twistos' }
    ],
    dulce: [
        { id: 'oreo', name: 'Oreo', price: 1800, image: 'images/oreo.png', alt: 'Galletitas Oreo' },
        { id: 'pepitos', name: 'Pepitos', price: 1800, image: 'images/pepitos.png', alt: 'Galletitas Pepitos' },
        { id: 'chocolinas', name: 'Chocolinas', price: 2000, image: 'images/chocolinas.png', alt: 'Galletitas Chocolinas' },
        { id: 'don-satur', name: 'Don Satur', price: 1000, image: 'images/donsatur.png', alt: 'Bizcochos Don Satur' },
        { id: 'formis', name: 'Formis', price: 1500, image: 'images/formis.png', alt: 'Galletitas Formis' }
    ],
    bebidas: [
        { id: 'jugo-baggio', name: 'Jugo Baggio', price: 1200, image: 'images/baggio.png', alt: 'Jugo Baggio' },
        { id: 'coca-cola', name: 'Coca-Cola', price: 1800, image: 'images/coca.png', alt: 'Coca-Cola' },
        { id: 'sprite', name: 'Sprite', price: 1800, image: 'images/sprite.png', alt: 'Sprite' },
        { id: 'fanta', name: 'Fanta', price: 1800, image: 'images/fanta.png', alt: 'Fanta' },
        { id: 'choc-c pindor', name: 'Chocolatada Cindor', price: 2200, image: 'images/cindor.png', alt: 'Chocolatada Cindor' }
    ]
};
const mapaDeProductos = {};
Object.values(baseDeDatosProductos).flat().forEach(p => {
    mapaDeProductos[p.id] = p;
});
let carrito = {}; 
let estaLogueado = false;
let paginaAnterior = 'pagina-principal'; 

document.addEventListener('DOMContentLoaded', () => {
    iniciarNavegacion();
    iniciarModales();
    iniciarCarrito();
    iniciarTarjetasProducto();
});
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

function iniciarTarjetasProducto() {
    document.querySelectorAll('.product-card').forEach(tarjeta => {
        const productoId = tarjeta.dataset.productId;
        
        tarjeta.querySelector('[data-accion="agregar"]').addEventListener('click', (e) => {
            e.stopPropagation();
            agregarProductoAlCarrito(productoId);
        });
        
        tarjeta.querySelector('[data-accion="remover"]').addEventListener('click', (e) => {
            e.stopPropagation();
            quitarProductoDelCarrito(productoId);
        });
    });
    
    actualizarInterfaz();
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
    const contenedorCarrito = document.getElementById('contenedor-items-carrito');
    const elementoTotal = document.getElementById('precio-total-carrito');
    
    contenedorCarrito.innerHTML = '';
    let itemsTotales = 0;
    let precioTotal = 0;

    const entradasDelCarrito = Object.entries(carrito); 

    if (entradasDelCarrito.length === 0) {
        contenedorCarrito.innerHTML = '<p class="cart-empty-message">Tu carrito está vacío.</p>';
    } else {
        entradasDelCarrito.forEach(([id, cantidad]) => {
            const producto = mapaDeProductos[id];
            itemsTotales += cantidad;
            precioTotal += producto.price * cantidad;

            const precioFormateado = `$${(producto.price * cantidad).toLocaleString('es-AR')}`;
            const itemCarrito = document.createElement('div');
            itemCarrito.className = 'cart-item';
            itemCarrito.dataset.productId = id; 
            itemCarrito.innerHTML = `
                <img src="${producto.image}" alt="${producto.alt}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${producto.name}</h4>
                </div>
                <div class="cart-item-controls">
                    <span class="quantity-control" data-accion="remover">-</span>
                    <span class="quantity">${cantidad}</span>
                    <span class="quantity-control" data-accion="agregar">+</span>
                </div>
                <p class="cart-item-price">${precioFormateado}</p>
            `;
            contenedorCarrito.appendChild(itemCarrito);
        });
    }

    elementoTotal.textContent = `$${precioTotal.toLocaleString('es-AR')}`;

    document.querySelectorAll('.product-card').forEach(tarjeta => {
        const id = tarjeta.dataset.productId;
        const elementoCantidad = tarjeta.querySelector('.quantity');
        if (elementoCantidad) {
            elementoCantidad.textContent = carrito[id] || 0;
        }
    });
}