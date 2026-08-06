document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el ID desde los parámetros de la URL (?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const noticiaId = urlParams.get('id');

    if (noticiaId) {
        cargarDetalleNoticia(noticiaId);
    } else {
        document.getElementById('detalle-titulo').textContent = 'Actualité non trouvée';
    }
});

async function cargarDetalleNoticia(id) {
    try {
        const response = await fetch('JSON/noticias.json');
        if (!response.ok) throw new Error('Erreur de chargement');

        const noticias = await response.json();
        const noticia = noticias.find(item => item.id == id);

        if (!noticia) {
            document.getElementById('detalle-titulo').textContent = 'Actualité introuvable';
            return;
        }

        // Renderizar datos en el DOM
        document.title = `${noticia.titulo} | ASEGEMA Settat`;
        document.getElementById('detalle-titulo').textContent = noticia.titulo;
        document.getElementById('detalle-fecha').textContent = `📅 ${formatearFecha(noticia.fecha)}`;
        document.getElementById('detalle-imagen').src = noticia.imagen;
        document.getElementById('detalle-imagen').alt = noticia.titulo;
        
        // --- PROCESAR PÁRRAFOS Y SALTOS DE LÍNEA ---
        const contenedorCuerpo = document.getElementById('detalle-cuerpo');
        contenedorCuerpo.innerHTML = ''; // Limpiar contenido previo

        // Divide el texto por cada doble o único salto de línea
        const parrafos = noticia.cuerpo.split(/\n+/);

        parrafos.forEach(textoParrafo => {
            if (textoParrafo.trim() !== '') {
                const p = document.createElement('p');
                p.innerHTML = textoParrafo.trim();
                contenedorCuerpo.appendChild(p);
            }
        });

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('detalle-titulo').textContent = 'Erreur lors du chargement';
    }
}

function formatearFecha(fechaStr) {
    const opciones = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
}