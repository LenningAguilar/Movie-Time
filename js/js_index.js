import getGeneros from "./generos.js";
import { initRouter } from "./route.js";

// Primero se descarga el html despues
// ejecuta las funciones


window.addEventListener("DOMContentLoaded", function () {
    getGeneros();
    initRouter();
});