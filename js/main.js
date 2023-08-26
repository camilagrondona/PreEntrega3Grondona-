// Productos

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
    

// Inicio

const userLogin = document.getElementById("userLogin")
const divProductos = document.getElementById("productos")

document.addEventListener("DOMContentLoaded", () => {
    // Función para crear las cards de mis productos
    generarCardsProductos(productos)
})

const generarCardsProductos = (productos) => {
    divProductos.innerHTML = "";

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

        const btnComprar = document.getElementById(`comprar${producto.id}`)
        // Función del carrito
        btnComprar.addEventListener("click", () => comprarProducto(producto.id))


    });
};

// Carrito 


// Usuarios

let dataBaseUsers = [
    {
        id: 1,
        user: "Camila",
        pass: "37031852",
        admin: true,
    },
];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(dataBaseUsers));