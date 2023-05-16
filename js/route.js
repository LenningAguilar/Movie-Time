import { renderGenero } from "./generos.js";

export const router = new Navigo("/", true);
//Checar
const $main = document.querySelector(".main");

export function initRouter(){
    //window.router = router; // Solamente para testing
    console.log("Iniciando")
    let { href: currentURL, origin: host } = window.location;
    console.log("currentURL", currentURL);
    console.log("host", host);
    let currentPath = currentURL.replace(host, "");
    console.log("currentPath", currentPath);

    //Ruta raiz top
    router.on("/", () => {
        const $main = document.querySelector(".main");

        $main.innerHTML = `
            <div class="main__title">
                <h2>Top peliculas</h2>
            </div>

            <div class="grid">
                <div class="grid__item">
                    <a href="info-movie.html">
                        <img id="poster" src="assets/img/Pelicula.jpg" alt="">
                        <div class="informacion__pelicula">
                            <div class="informacion__pelicula__titulo">
                                <h2 id="titulo">Mario bros</h2>
                            </div>
                            <div class="informacion__pelicula__detalles">
                                <p id="anio">2023</p>
                                <p id="duracion">155 min</p>
                            </div>
                            <div class="informacion__pelicula__sinopsis">
                                <p id="sinopsis">Un fontanero llamado Mario viaja por un laberinto subterráneo con su hermano, Luigi, intentando salvar a una princesa capturada.</p>
                            </div>
                            <div class="informacion__pelicula__actores">
                                <p id="actores">Actores: Mario bros, Lugio Bros</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `;
    });

    //Ruta de genero
    router.on('/generos/:idGenero/:categoria', () => {
         // renderGenero(4).then( (seccion) => {
         //     $main.appendChild(seccion);
         //     //console.log(seccion);
         // });

    });

    router.on('/generos/1/Biography', () => {
        console.log("Hola");
    });

    //Ruta search
    router.on("/search", ({ data }) => {

    });

    //Ruta de pelicula
    router.on("/movie/:id/:name", ({ data }) => {

    });

    router.resolve(currentPath);
}