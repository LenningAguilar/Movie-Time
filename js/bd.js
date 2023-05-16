export function saveMovies(movies) {
    //Convertimos el objeto a string
    let peliculas = JSON.stringify(movies);
    localStorage.setItem("peliculas", peliculas);
}

export function getMovies() {
    let movies = localStorage.getItem("movies");
    return JSON.parse(movies)
}