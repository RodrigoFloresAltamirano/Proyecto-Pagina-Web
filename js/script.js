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

        // Mostrar esquema en consola
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