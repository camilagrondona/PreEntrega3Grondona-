let admin = [
    {
        id: 1,
        user: "Camila",
        pass: "37031852",
        admin: true,
    },
];

JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(admin));

//Nodos

const btnRegister = document.getElementById("btn__register")
const formRegistry = document.getElementById("user__registry")
const btnLogin = document.getElementById("btn__login")
const formLogin = document.getElementById("user__login")

let usuarios = JSON.parse(localStorage.getItem("usuarios"))

// Constructor nuevos usuarios

class newUser {
    constructor(user, pass) {
        this.id = usuarios.length + 1
        this.user = user
        this.pass = pass
        this.admin = false
    }
}

let usuario;

/*Login*/

// Evento 

btnLogin.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formLogin.children[0].children[1].value
    const pass = formLogin.children[1].children[1].value

    validarYlogear(user, pass)
})

// Función para validar usuario y logearse

const validarYlogear = (user, pass) => {

    const userExists = usuarios.find((usuario) => usuario?.user === user)

    if (userExists === undefined || userExists.pass !== pass) {
        Swal.fire
            ({
                icon: 'error',
                title: 'Oops...',
                text: 'Error en usuario o contraseña',
            })
    } else {

        let usuario = {
            user: userExists.user,
            pass: userExists.pass,
            admin: userExists.admin
        }

//Sweet Alert Bienvenida
        Swal.fire
            ({
                position: 'center',
                title: 'Te damos la bienvenida a Tienda Friki',
                showConfirmButton: false,
                timer: 1000,
            })

// Redirección al inicio
        setTimeout(() => {
            sessionStorage.setItem("usuario", JSON.stringify(usuario))
            location.href = "../index.html"
        }, 1000);
    }
}

/*Registro nuevos usuarios*/

// Evento 

btnRegister.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formRegistry.children[0].children[1].value
    const pass = formRegistry.children[1].children[1].value

    const nuevoUsuario = new newUser(user, pass)

    validarYRegistrar(nuevoUsuario)
})

// Función para validar usuario y registrarse

const validarYRegistrar = (nuevoUsuario) => {

    const userNuevo = usuarios.find((usuario) => usuario?.user === nuevoUsuario.user)
    if (userNuevo === undefined) {

        usuarios.push(nuevoUsuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario))

//Sweet Alert bienvenida nuevo usuario y redirección
        Swal.fire
            ({
                position: 'center',
                title: 'Gracias por registrarte. Te redigiremos a la página principal',
                showConfirmButton: false,
                timer: 1000,
            })

// Redirección al inicio
        setTimeout(() => {
            location.href = "../index.html"
        }, 1000);
    } else {
//Sweet Alert "El usuario ya existe"
        Swal.fire
            ({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario ya existe',
            })
        sessionStorage.setItem("usuario", JSON.stringify(usuario))
    }
}