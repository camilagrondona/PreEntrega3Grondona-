// Array productos

const productos = [
    {
        id: 1,
        nombre: "Funko Pop! Marvel Avengers - Ironman",
        precio: 30990,
        imagen: "./img/ironman.jpg",
        categoria: "Marvel"
    },
    {
        id: 2,
        nombre: "Funko Pop! Marvel Avengers - Spiderman No Way Home",
        precio: 30990,
        imagen: "./img/spiderman.jpg",
        categoria: "Marvel"
    },
    {
        id: 3,
        nombre: "Funko Pop! Marvel Guardianes de la Galaxia 3 - Groot",
        precio: 30990,
        imagen: "./img/groot.jpg",
        categoria: "Marvel"
    },
    {
        id: 4,
        nombre: "Funko Pop! Marvel Wanda Vision - Vision 50s Blanco y Negro",
        precio: 44000,
        imagen: "./img/vision50s.jpg",
        categoria: "Marvel"
    },
    {
        id: 5,
        nombre: "Funko Pop! Peliculas: Avatar The Way of the Water - Jake Sully",
        precio: 30990,
        imagen: "./img/jakesully.jpg",
        categoria: "Peliculas"
    },
    {
        id: 6,
        nombre: "Funko Pop! Peliculas: Harry Potter - Dobby",
        precio: 30990,
        imagen: "./img/dobby.jpg",
        categoria: "Peliculas"
    },
    {
        id: 7,
        nombre: "Funko Pop! Peliculas: Harry Potter - Harry con Hedwig Plataforma 9 3/4",
        precio: 46000,
        imagen: "./img/harryhedwig.jpg",
        categoria: "Peliculas"
    },
    {
        id: 8,
        nombre: "Funko Pop! Peliculas: Suicide Squad - Harley Quinn",
        precio: 30990,
        imagen: "./img/harleyquinn.jpg",
        categoria: "Peliculas"
    },
    {
        id: 9,
        nombre: "Funko Pop! Star Wars  - Chewbacca",
        precio: 30990,
        imagen: "./img/chewbacca.jpg",
        categoria: "Star Wars"
    },
    {
        id: 10,
        nombre: "Funko Pop! Star Wars  - Darth Vader",
        precio: 44000,
        imagen: "./img/darthvader.jpg",
        categoria: "Star Wars"
    },
    {
        id: 11,
        nombre: "Funko Pop! Star Wars The Mandalorian - Grogu",
        precio: 30990,
        imagen: "./img/grogu.jpg",
        categoria: "Star Wars"
    },
    {
        id: 12,
        nombre: "Funko Pop! Star Wars The Mandalorian - Mando con Grogu",
        precio: 46000,
        imagen: "./img/mandogrogu.jpg",
        categoria: "Star Wars"
    },
];

const divProductos = document.getElementById("productos")
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")
const carritoTable = document.getElementById("carrito")

//Funciones del Carrito:

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
};

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

document.addEventListener("DOMContentLoaded", () => {
    // Función para crear las cards de mis productos
    generarCardsProductos(productos)
})

const generarCardsProductos = (productos) => {
    divProductos.innerHTML = "";

    // Card productos 

    productos.forEach((producto) => {
        let card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
    <div class="card-body">
    <p class="card-title">${producto.nombre}</p>
    <p class="card-text">Categoria: ${producto.categoria}</p>
    <p class="card-text">Precio: <b>$${producto.precio}</b></p>
    <button id="comprar${producto.id}" class="btn btn-primary">Comprar</button>
    </div>
    </div>`;

        divProductos.appendChild(card);

        // Función del carrito comprar producto
        const btnComprar = document.getElementById(`comprar${producto.id}`)
        btnComprar.addEventListener("click", () => comprarProducto(producto.id))
    });
};

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

const comprarProducto = (idProducto) => {
    const productosDisponibles = productos.find((producto) => producto.id === idProducto)
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

    /*USAR SWEET ALERT!!!!!!!!!!!!!!!!!!!!*/
    alert(`Compraste el producto ${productosDisponibles.nombre}`)
}

// Usuarios (Botones Login / Cerrar sesión)

const userLogin = document.getElementById("userLogin")
let usuarioLogeado = JSON.parse (sessionStorage.getItem("usuario"))

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