document.addEventListener('DOMContentLoaded', () => {
    cargarNoticias();
});

async function cargarNoticias() {
    const container = document.getElementById('noticias-container');

    try {
        const response = await fetch('JSON/noticias.json');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const noticias = await response.json();
        
        // Limpiar el contenedor antes de renderizar
        container.innerHTML = '';

        noticias.forEach(noticia => {
            // 1. Crear el elemento tarjeta
            const card = document.createElement('article');
            card.classList.add('noticia-card');

            // 2. Construir la estructura interna
            card.innerHTML = `
                <div class="card-header">
                    <span class="badge">NOTICIAS</span>
                    <img src="${noticia.imagen}" alt="${noticia.titulo}">
                </div>
                <div class="card-body">
                    <p class="fecha">• ${formatearFecha(noticia.fecha)}</p>
                    <h3 class="titulo">${noticia.titulo}</h3>
                    <a href="noticia.html?id=${noticia.id}" class="btn-leer">Leer más &rarr;</a>
                </div>
            `;

            // 3. Insertar en el DOM
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error al cargar las noticias:', error);
        container.innerHTML = '<p class="error-msg">Impossible de charger les actualités pour le moment.</p>';
    }
}

// Función auxiliar para dar formato a la fecha (Ej: "5 AOÛT 2026")
function formatearFecha(fechaStr) {
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('fr-FR', opciones).toUpperCase();
}