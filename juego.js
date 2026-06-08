async function cargarJuego(){
    const parametros = new URLSearchParams(window.location.search);
    const idBuscado = parametros.get("id");
    const respuesta = await fetch('juegos.xml');
    const texto = await respuesta.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, "text/xml");
    const juegos = xml.getElementsByTagName('juego');
    const contenedor = document.getElementById("detalle-juego");
    for (let juego of juegos) {
        const id = juego.getElementsByTagName("id")[0].textContent;
        if (id === idBuscado) {
            const nombre = juego.getElementsByTagName("nombre")[0].textContent;
            const genero = juego.getElementsByTagName("genero")[0].textContent;
            const plataforma = juego.getElementsByTagName("plataforma")[0].textContent;
            const puntuacion = parseFloat(juego.getElementsByTagName("puntuacion")[0].textContent);
            const imagen = juego.getElementsByTagName("imagen")[0].textContent;
            const descripcion = juego.getElementsByTagName("descripcion")[0].textContent;
            contenedor.innerHTML = `
                <div class="detalle-juego">
                    <img src="${imagen}" alt="${nombre}">
                    <h1>${nombre}</h1>
                    <p><strong>Género:</strong> ${genero}</p>
                    <p><strong>Plataforma:</strong> ${plataforma}</p>
                    <p><strong>puntuación:</strong> ${puntuacion}</p>
                    <p>${descripcion}</p>
                </div>
            `;
            break;
        }
    }
}
cargarJuego();