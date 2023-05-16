import { router } from "./route.js";
import { saveMovies } from "./bd.js";

export default function getGeneros(){
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            var jsonResponse = JSON.parse(xhr.responseText);
            console.log(jsonResponse);
            crearGeneros(jsonResponse);
        }
    });
    xhr.open('GET', 'https://streaming-availability.p.rapidapi.com/v2/genres');
    xhr.setRequestHeader('X-RapidAPI-Key', '7aa061f6c2msh7dff68ce72ba1cep185ba7jsn716ab9bfc0eb');
    xhr.setRequestHeader('X-RapidAPI-Host', 'streaming-availability.p.rapidapi.com');
    xhr.send();
}

function crearGeneros(Lista){
    var $fragment = document.createDocumentFragment();

    var $lista = document.getElementById("menu-generos");
    
    //Checar el for y acceder a cada atributo
    for (const id in Lista.result){
        const genero = Lista.result[id];
        var $li = document.createElement("li");
        $li.classList.add("menu__submenu--item");

        var $a = document.createElement("a");
        $a.textContent = genero;
        $a.setAttribute("href", "/generos/" + id  + "/" + genero);
        $a.setAttribute("data-navigo", "");
        
        $li.appendChild($a);
        $fragment.appendChild($li);
    }
    $lista.appendChild($fragment);
}


export async function renderGenero(idGenero){
    const $peliculasGenero = 'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=' + idGenero;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7aa061f6c2msh7dff68ce72ba1cep185ba7jsn716ab9bfc0eb',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    const $peliculas = await fetch($peliculasGenero , options)
    .then(res => res.json())
    .then(res => {
        //res.result es para acceder a todos los arreglos de esa categoria
        //console.log(res.result);
        saveMovies(res.result);
        return templatePeliculas(res.result);
    });

    return $peliculas;
}

function templatePeliculas(peliculas){
    const fragment = document.createDocumentFragment();
    const $template = document.querySelector(".grid");

    peliculas.forEach((movie, index) => {
        var title = movie.title;
        var overview = movie.overview;
        var year = movie.year;
        var time = movie.runtime; 
        var image = movie.backdropURLs.original;

        // console.log(`Película ${index}: ${title}`);
        // console.log(`Link de imagen: ${image}`);
        // console.log(`Descripción: ${overview}`);
        // console.log(`Año: ${year}`);
        // console.log(`Duracion: ${time} min`);
        // console.log(`Actores: ${movie.cast.join(', ')}`);
        // console.log('--------------------------');
        
        

        const $clonItemPelicula = $template.content.cloneNode(true);
        
        $clonItemPelicula.querySelector("#poster").src = image;

        $clonItemPelicula.querySelector("#titulo").textContent = title;
        
        $clonItemPelicula.querySelector("#anio").textContent = `Año: ${year}`;
        
        $clonItemPelicula.querySelector("#duracion").textContent = `Duracion: ${time} min`;
        
        $clonItemPelicula.querySelector("#sinopsis").textContent = overview;
        
        $clonItemPelicula.querySelector("#actores").textContent = `Actores: ${movie.cast.join(', ')}`;        
        
        
        fragment.appendChild($clonItemPelicula);
    });

    const container = document.createElement('div');
    // Agregar el fragmento al contenedor
    container.appendChild(fragment);

    container.classList.add('grid');

    // Obtener el contenido HTML como cadena utilizando innerHTML
    //console.log(container);
    return container;
}