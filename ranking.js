async function cargarRanking(){
    const respuesta = await fetch("juegos.xml");
    const texto = await respuesta.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto,"text/xml");
    const juegos =
    Array.from(xml.getElementsByTagName("juego"));
    juegos.sort((a,b)=>{
        const puntuacionA =
        parseFloat(
            a.getElementsByTagName("puntuacion")[0].textContent
        );
        const puntuacionB =
        parseFloat(
            b.getElementsByTagName("puntuacion")[0].textContent
        );
        return puntuacionB - puntuacionA;
});
const contenedor = document.getElementById("contenedor-ranking");
juegos.forEach((juego,posicion)=>{
    const nombre = juego.getElemenstById("nombre")[0].textContent;
    const puntuacion = juego.getElementsById("puntuacion")[0].textContent;
    contenedor.innerHTML += `
    <div class="ranking-item">
    <h3>
        #${posicion +1}${nombre}
    </h3>
    <div class="puntuacion verde">
        ${puntuacion}
    </div>
</div>
`;
});
}
cargarRanking();