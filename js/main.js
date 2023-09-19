const divProductos = document.getElementById("productos")
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")
const carritoTable = document.getElementById("carrito")

let productosDisponibles = [];

// Función para cargar los productos desde el archivo JSON
const cargarProductos = () => {
    fetch('./db/productos.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON de productos.')
            }
            return response.json()
        })
        .then((data) => {
            productosDisponibles = data
            generarCardsProductos(productosDisponibles)
        })
        .catch((error) => {
            console.error('Error al cargar los productos:', error)
        });
};

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos()
})

// Generar card productos 
    const generarCardsProductos = (productosDisponibles) => {
    divProductos.innerHTML = "";

    productosDisponibles.forEach((producto) => {
        let card = document.createElement("div")
        card.className = "producto"
        card.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
    <div class="card-body">
    <p class="card-title">${producto.nombre}</p>
    <p class="card-text">Categoria: ${producto.categoria}</p>
    <p class="card-text">Precio: <b>$${producto.precio}</b></p>
    <button id="comprar${producto.id}" class="btn btn-primary">Comprar</button>
    </div>
    </div>`

        divProductos.appendChild(card)

        const btnComprar = document.getElementById(`comprar${producto.id}`)
        btnComprar.addEventListener("click", () => comprarProducto(productosDisponibles, producto.id))
    })
}

/*Funciones del Carrito*/

// Función dibujar Carrito

const dibujarCarrito = () => {

    listaCarrito.innerHTML = '';
    carrito.forEach((productosDisponibles) => {
        const { imagen, nombre, cantidad, precio, id } = productosDisponibles
        let body = document.createElement("tr")
        body.className = "producto__carrito"
        body.innerHTML = `
    <th><img id="fotoProductoCarrito" src="${imagen}" class="card-img-top" style="width:40%; height: 30%"</th>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio / cantidad}</td>
    <td>${precio}</td>
    <td>
    <button id="+${id}">+</button>
    <button id="-${id}">-</button>
    </td>
    `
        listaCarrito.append(body)

        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => aumentarCantidad(id))
        btnRestar.addEventListener("click", () => restarCantidad(id))
    });

    dibujarFooter();
}

// Función dibujar Footer Carrito 

const dibujarFooter = () => {

    if (carrito.length > 0) {
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
    <th><b>Totales:</b></th>
    <td></td>
    <td>${generarTotales().cantidadTotal}</td>
    <td></td>
    <td>${generarTotales().costoTotal}</td>
    `

        footCarrito.append(footer)
    } else {
        footCarrito.innerHTML = "<h3> No agregaste productos al carrito </h3>"
    }

}

// Función generar totales Carrito

const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, { cantidad }) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

// Aumentar la cantidad en el carrito 

const aumentarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

    localStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()

}

// Restar la cantidad en el carrito 

const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

    if (carrito[indexProductoCarrito].cantidad === 0) {
        carrito.splice(indexProductoCarrito, 1)
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()
}


JSON.parse(localStorage.getItem("carrito")) === null && localStorage.setItem("carrito", JSON.stringify([]))

//Dibujar tabla carrito 

document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito();
});

let carrito = JSON.parse(localStorage.getItem("carrito"))

// Evento: si hago click sobre el carrito aparece la tabla

btnCarrito.addEventListener("click", () => {
    if (carritoTable.style.display === "block") {
        carritoTable.style.display = "none"
    } else {
        carritoTable.style.display = "block"
        dibujarCarrito()
    }
})

// Agregar productos al carrito 

const comprarProducto = (productos, idProducto) => {
    let productosDisponibles = productos.find((producto) => producto.id === idProducto)
    const productoCarrito = carrito.find((producto) => producto.id === idProducto)
    if (productoCarrito === undefined) {
        const nuevoProductoCarrito = {
            id: productosDisponibles.id,
            nombre: productosDisponibles.nombre,
            precio: productosDisponibles.precio,
            imagen: productosDisponibles.imagen,
            cantidad: 1
        }

        carrito.push(nuevoProductoCarrito)

        localStorage.setItem("carrito", JSON.stringify(carrito))
    } else {
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = productosDisponibles.precio * carrito[indexProductoCarrito].cantidad

        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(localStorage.getItem("carrito"))

// Sweet Alert Carrito

    Swal.fire
        ({
            position: 'center',
            icon: 'success',
            title: 'Producto añadido con éxito',
            showConfirmButton: false,
            timer: 1500
        })}

// Usuarios (Botones Login / Cerrar sesión)

    const userLogin = document.getElementById("userLogin")
    let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))

    document.addEventListener("DOMContentLoaded", () => {

        if (usuarioLogeado === null) {
            const a = document.createElement("a")
            a.href = "./html/usuarios.html"
            a.innerHTML = "Login"
            userLogin.appendChild(a)
        } else {
            const p = document.createElement("p")
            const close = document.createElement("button")

            p.innerHTML = `Bienvenido/a ${usuarioLogeado.user}`
            close.id = "cerrar__sesion"
            close.innerHTML = "Cerrar sesión"
            close.addEventListener("click", () => {
                alert(`¡Hasta pronto ${usuarioLogeado.user}!`)

                sessionStorage.removeItem("usuario")
                location.reload()
            })
            userLogin.appendChild(p)
            userLogin.appendChild(close)
        }
    })

// Filtros 

    const filterInput = document.getElementById("filter__input")

    const filterCategoria = document.getElementById("filter__lista")

// Función para filtrar productos
    const filtrarProductos = (productos, filtro, categoria) => {
    let productosFiltrados = productos

// Filtrar por input
        if (filtro) {
            const filtroLowerCase = filtro.toLowerCase()
            productosFiltrados = productosFiltrados.filter((producto) => {
                return producto.nombre.toLowerCase().includes(filtroLowerCase)
            })
        }
    
// Filtrar por categoría / lista
        if (categoria && categoria !== "todos") {
            productosFiltrados = productosFiltrados.filter((producto) => {
                return producto.categoria === categoria
            })
        }
    
        return productosFiltrados
    };
    
// Evento para el input de filtro
    filterInput.addEventListener("keyup", (e) => {
        const filtro = e.target.value
        const categoriaSeleccionada = filterCategoria.value
        
// Filtrar productos y generar las tarjetas actualizadas
        const productosFiltrados = filtrarProductos(productosDisponibles, filtro, categoriaSeleccionada)
        generarCardsProductos(productosFiltrados)
    });
    
// Evento para la lista de filtro por categoría
    filterCategoria.addEventListener("change", () => {
        const filtro = filterInput.value
        const categoriaSeleccionada = filterCategoria.value
    
// Filtrar productos y generar las tarjetas actualizadas
        const productosFiltrados = filtrarProductos(productosDisponibles, filtro, categoriaSeleccionada)
        generarCardsProductos(productosFiltrados)
    });



