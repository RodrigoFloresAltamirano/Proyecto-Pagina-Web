        // Ejemplo de esquema de base de datos (SQLite)
        const databaseSchema = {
            tables: [
                {
                    name: "usuarios",
                    fields: [
                        "id INTEGER PRIMARY KEY AUTOINCREMENT",
                        "nombre TEXT NOT NULL",
                        "email TEXT UNIQUE NOT NULL",
                        "password TEXT NOT NULL",
                        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
                    ]
                },
                {
                    name: "productos",
                    fields: [
                        "id INTEGER PRIMARY KEY AUTOINCREMENT",
                        "nombre TEXT NOT NULL",
                        "descripcion TEXT",
                        "precio REAL NOT NULL",
                        "imagen_url TEXT",
                        "video_url TEXT",
                        "stock INTEGER DEFAULT 0",
                        "categoria TEXT"
                    ]
                },
                {
                    name: "carrito",
                    fields: [
                        "id INTEGER PRIMARY KEY AUTOINCREMENT",
                        "usuario_id INTEGER REFERENCES usuarios(id)",
                        "producto_id INTEGER REFERENCES productos(id)",
                        "cantidad INTEGER DEFAULT 1",
                        "agregado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
                    ]
                }
            ]
        };

        // Mostrar esquema en consola PROBABLEMENTE SE TENGA QUE QUITAR
        console.log("Esquema de Base de Datos:", databaseSchema);

        // Simple cart functionality
        document.addEventListener('DOMContentLoaded', function() {
            const addButtons = document.querySelectorAll('.product-card button');
            
            addButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productName = productCard.querySelector('h3').textContent;
                    alert(`"${productName}" agregado al carrito`);
                });
            });
        }); 
/*Función para añadir productos al carrito*/
function addToCart (productId, buttonElment){
    const cantidadElement = document.getElementById(`cantidad-${productId}`);
    const quantity= parseInt(cantidadElement.textContent,10);
    
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const product = productos.find(p => p.id === productId);
            if (product) {
                cart.push({...product,quantity: quantity});
                displayCart();
            }
        })
        .catch(error => console.error('Error al obtener el producto', error));
    }

    buttonElment.style.display = 'none';

    const cantidadContainer = buttonElment.nextElementSibiling;
    cantidadContainer.style.display = 'flex';

    const cardImgElement = buttonElment.closest('.cards__card').querySelector('.card.img');
    cardImgElement.classList.add('active');
}

/* Función para incrementar La cantidad de un producto */
function incrementarProducto(productId) {
    const cantidadElemento = document.getElementById(`cantidad-${productId}`);
    let cantidad = parseInt(cantidadElemento.textContent, 10);
    cantidad++;
    cantidadElemento.textContent = cantidad;

    const producto = cart.find(item => item.id === productId);
    if (producto) {
    producto.quantity = cantidad;
    }
displayCart();
}
/* Función para decrementar la cantidad de un producto */
function decrementarProducto(productId) {
const cantidadElemento = document.getElementById(`cantidad-${productId}`);
let cantidad = parseInt(cantidadElemento.textContent, 10);

if (cantidad > 1) {
    cantidadElemento.textContent = cantidad;
    } else {
    cantidad = 0;

    cart = cart.filter(item => item.id !== productId);

    const cantidadContainer = cantidadElemento.parentElement;
    const buttonElment = cantidadContainer.previousElementSibling;
    cantidadContainer.style.display = 'none';
    buttonElment.style.display = 'inline-block';
    
    const cardImgElement = buttonElment.closest('.cards__card').querySelector('.card.img');
    cardImgElement.classList.remove('active');
    }

    const producto = cart.find(item => item.id === productId);
    if(producto) {
        producto.quantity = cantidad;
    }
    displayCart();

}


/* Función para eliminar un producto del carrito */
function removeFromCart(productId){
    cart = cart.filter(item => item.id !== productId);

    const cantidadContainer = document.getElementById(`cantidad-${productId}`).parentElement;
    const buttonElment = cantidadContainer.previousElementSibling;
    cantidadContainer.style.display = 'none';
    buttonElment.style.display = 'inline-block';

    const cantidadElemento = document.getElementById(`cantidad-${productId}`);
    cantidadElemento.textContent = 1;

    const cardImgElement = buttonElment.closest('.cards__card').querySelector('.card__img');
    cardImgElement.classList.remove('active');

    displayCart();
}
/* Función para mostrar los productos en el carrito */

function displayCart() {
    const cartList = document.querySelector('.cart-list__items');
    const cartHeader = document.querySelector('.cart-list h2');
    cartList.innerHTML = '';

    let total = 0;

    if (cart.length === 0){
        cartList.innerHTML = `
            <div class="items__img">
            <img src="img/producto1.jpg" alt="Product 1">
            </div>
            <p>Tus productos aparecerán aqui</p>
        `;
    } else {
        cart.forEach(item => {
            total += item.precio * item.quantity;
            cartList.innerHTML += `
            <div class =  "items__item">
                <h4>${item.nombre} </h4>
                <div class="item__detalles">
                    <p>${item.quantity}x <span>$${item.precio.toFixed(2)}</span></p>
                    <p>$$${(item.precio.toFixed(2) * item.quantity).toFixed(2)}</p>
                    <button onclick="reomoveFromCart(${item.id})">
                        <i class="ri-close-circle-line"></i>
                    </button>
                </div>
            </div>
            `;
        });

        const totalContainer = document.createElement('div');
        totalContainer.classList('item__total');
        totalContainer.innerHTML = `
            <div>
                <span>Total a cancelar: </span>
                <span class="total__monto">$${total.toFixed(2)}</span>
            </div>
            <button class="btn" id="btn-checkout">Realizar Pedido</button>
        `;
        cartList.appendChild(totalContainer);
    }

    const checkoutButton = document.getElementById('btn-checkout');
    if(checkoutButton){ 
        //checkoutButton.addEventListener('click',mostrarModalPedido);
    }

    const totalItems = cart.reduce((acc,item) => acc + item.quantity,0);
    cartHeader.textContent = `Tu carrito (${totalItems})`;
}

/* Función para mostrar el modal de pedido */
/* Función para cerrar el modal de pedido y resetear el estado del carrito */

                                                                                                                                                        
