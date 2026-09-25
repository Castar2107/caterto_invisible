
// frontend/script.js — la manipulació d'aquesta setmana
const titol = document.querySelector("#titolPrincipal");
titol.textContent = "📮 El Cartero Invisible – Setmana 2";
titol.setAttribute("data-role", "banner");

const contenidor = document.querySelectorAll("#contenidorCartes");
contenidor[0].innerHTML = "<p>Cartes pendents: 0</p>";

const info = document.querySelector(".info");
info.style.color = "#2c3e50";

