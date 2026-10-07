//////////////////////////////////////////////////
//  VARIABLES GLOBALS                           //
//////////////////////////////////////////////////
let nom = "Pepe";
let edat = 30;

const cartes = [
    { id: 1, remitent: "Maria", contingut: "Hola, com estàs? T'escric des del passat." },
    { id: 2, remitent: "Joan", contingut: "Avui he vist un carter misteriós." },
    { id: 3, remitent: "Laia", contingut: "Recorda que el temps és relatiu." }
];

//////////////////////////////////////////////////
//  FUNCIONS                                    //
//////////////////////////////////////////////////

/**
 * Inicialitza la pàgina: configura el títol, estils i botons.
 */
function inicialitzar() {
    // 1. Obtenim els elements del DOM
    const titol = document.querySelector("#titolPrincipal");
    const info = document.querySelector(".info");
    const mostrarCartes = document.querySelector("#btnMostrarCartes");
    const btnAfegir = document.querySelector("#btnAfegir");
    // 2. Configurem el títol
    titol.textContent = "📮 El Cartero Invisible – Setmana 2";
    titol.setAttribute("data-role", "banner");

    // 3. Configurem estils
    info.style.color = "#2c3e50";


    // 4. Gestor del botó per afegir cartes
    mostrarCartes.addEventListener("click", () => {
        renderitzarCartes(cartes);
    });

    btnAfegir.addEventListener("click", () => {
        const novaCarta = {
            id: cartes.length + 1,
            remitent: "Carter " + (cartes.length + 1),
            contingut: "Aquesta carta s'acaba de crear dinàmicament!"
        };
        cartes.push(novaCarta);
        renderitzarCartes(cartes);
    });
}

/**
 * Renderitza totes les cartes al contenidor.
 * @param {Array} cartes - Array d'objectes carta a mostrar
 */
function renderitzarCartes(cartes) {
    const contenidor = document.querySelector("#contenidorCartes");
    contenidor.innerHTML = "<p class='info'>Cap carta per mostrar.</p>"; // 1. Buidem el taulell

    cartes.forEach(carta => {
        // 2. Creem els elements de la carta
        const divCarta = document.createElement("div");
        divCarta.className = "carta";

        const titolCarta = document.createElement("h3");
        titolCarta.textContent = `De: ${carta.remitent}`;

        const paragraf = document.createElement("p");
        paragraf.textContent = carta.contingut;

        const idSpan = document.createElement("span");
        idSpan.textContent = `#${carta.id}`;
        idSpan.setAttribute("data-id", carta.id);

        // 3. Muntem l'estructura
        divCarta.appendChild(titolCarta);
        divCarta.appendChild(paragraf);
        divCarta.appendChild(idSpan);

        // 4. Pengem la carta al taulell
        contenidor.appendChild(divCarta);
    });
}

//////////////////////////////////////////////////
//  INICIALITZACIÓ (executa només al navegador) //
//////////////////////////////////////////////////
if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", inicialitzar);
}

//////////////////////////////////////////////////
//  EXPORTS                                     //
//////////////////////////////////////////////////
export { renderitzarCartes };

