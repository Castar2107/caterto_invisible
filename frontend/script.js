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
    const form = document.querySelector("#formAfegirCarta");
    const remitent = document.querySelector("#remitent").value.trim();
    const destinatari = document.querySelector("#destinatari").value.trim();
    const contingut = document.querySelector("#contingut").value.trim();

    titol.textContent = "📮 El Cartero Invisible – Setmana 2";
    titol.setAttribute("data-role", "banner");

    // 3. Configurem estils
    info.style.color = "#2c3e50";


    // 4. Gestor del botó per afegir cartes
    mostrarCartes.addEventListener("click", () => {
        renderitzarCartes(cartes);
    });
    // 5. Evitem que el formulari es recarregui

    form.addEventListener("submit", (event) => {
        event.preventDefault();   // ⭐ atura la recàrrega
        const remitent = document.querySelector("#remitent").value.trim();
        const destinatari = document.querySelector("#destinatari").value.trim();
        const contingut = document.querySelector("#contingut").value.trim();
        const personatge = document.querySelector("#personatge").value.trim();

        if (!remitent || !destinatari || !contingut || !personatge) {
            alert("Tots els camps són obligatoris!");
            return;
        }

        cartes.push({
            id: cartes.length + 1,
            remitent: remitent,
            destinatari: destinatari,
            contingut: contingut,
            personatge: personatge
        });
        form.reset();  // neteja el formulari
        renderitzarCartes(cartes);  // actualitza la llista de cartes
    })


    // 2. Configurem el títol
    contenidor.addEventListener("click", (event) => {
        // Qui ha estat? Si és un botó d'eliminar...
        if (event.target.classList.contains("btn-eliminar")) {
            const carta = event.target.closest(".carta");   // troba la carta pare
            // ...elimina la carta
            carta.remove();
            // Elimina la carta del array cartes
            cartes.splice(cartes.findIndex(c => c.id == carta.querySelector("span").dataset.id), 1);  // elimina del array
        }
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

