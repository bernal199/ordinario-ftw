document.getElementById('form-login').addEventListener('submit', async function(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const respuesta = await fetch('usuarios.xml');
    const texto = await respuesta.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, "text/xml");
    const usuarios = xml.getElementsByTagName('usuario');
    let valido = false;
    for (let user of usuarios){
        const nombre = user.getElementsByTagName("nombre")[0].textContent;
        const pass = user.getElementsByTagName("password")[0].textContent;
        if(nombre === usuario && pass === password){
            valido = true;
            break;
        }
    }
    const mensaje = document.getElementById("mensaje");
    if(valido){
        mensaje.textContent = "Acceso concedido";
        mensaje.style.color = "green";
    }else{
        mensaje.textContent = "Datos incorrectos";
        mensaje.style.color = "red";
    }
});