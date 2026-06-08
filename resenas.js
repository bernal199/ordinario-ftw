async function cargarResenas(){
    const respuesta =await fetch("resenas.xml");
    const texto = await respuesta.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto,"text/xml");
    const resenas = xml.getElementsByTagName("resena");
    const contenedor = document.getElementById("contenedor-resenas");
    for(let resena of resenas){
        const juegoId = resena.getElementsByTagName("juego")[0].textContent;
        const usuario = resena.getElementsByTagName("autor")[0].textContent;
        const puntuacion = resena.getElementsByTagName("puntuacion")[0].textContent;
        const comentario = resena.getElementsByTagName("comentario")[0].textContent;
        contenedor.innerHTML += `
        <div class="resena">
            <h3>${juegoId}</h3>
            <p><strong>Autor:</strong> ${usuario}</p>
            <p><strong>Puntuación:</strong> ${puntuacion}</p>
            <p>${comentario}</p>
        </div>
        `;
    }
}
cargarResenas();