async function cargarJuegos() {
    const respuesta = await fetch('juegos.xml');
    const texto = await respuesta.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, "text/xml");
    const juegos = xml.getElementsByTagName('juego');
    const contenedor = document.getElementById("Contenedor juegos");
    for (let juego of juegos) {
        const nombre = juego.getElementsByTagName("nombre")[0].textContent;
        const genero = juego.getElementsByTagName("genero")[0].textContent;
        const plataforma = juego.getElementsByTagName("plataforma")[0].textContent;
        const puntuacion = parseFloat
            (juego.getElementsByTagName("puntuación")[0].textContent);
        const imagen = juego.getElementsByTagName("imagen")[0].textContent;
        const descripcion = juego.getElementsByTagName("descripcion")[0].textContent;
        let color = "rojo";
        if (puntuacion >= 90) {
            color = "verde";
        } else if (puntuacion >= 70) {
            color = "amarillo";
        }
        const tarjeta = `
        <div class="tarjeta">
            <img src="${imagen}">
            <div class="info">
                <h3>${nombre}</h3>
                <p><strong>Género:</strong> ${genero}</p>
                <p><strong>Plataforma:</strong> ${plataforma}</p>
                <p>${descripcion}</p>
                <div class="puntuacion ${color}">
                    ${puntuacion}
                </div>
            </div>
        </div>
        `;
        contenedor.innerHTML += tarjeta;
    }
}
cargarJuegos();