async function cargarTiendas(){
    const respuesta = await fetch("tiendas.xml");
    const texto = await respuesta.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto,"text/xml");
    const tiendas = xml.getElementsByTagName("tienda");
    const contenedor = document.getElementById("contenedor-tiendas");
    for (let tienda of tiendas){
        const nombre = tienda.getElementsByTagName("nombre")[0].textContent;
        const logo = tienda.getElementsByTagName("logo")[0].textContent;
        const url = tienda.getElementsByTagName("url")[0].textContent;
        const descripcion = tienda.getElementsByTagName("descripcion")[0].textContent;
        contenedor.innerHTML += `
        <div class="tienda-card">
            <img src="${logo}" alt="${nombre}" class="logo-tienda">
            <div class="tienda-info">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            </div>
            <a href="${url}" target="_blank">
                Visitar tienda
            </a>
        </div>
        `;
    }
}
cargarTiendas();