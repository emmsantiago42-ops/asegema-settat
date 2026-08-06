document.addEventListener('DOMContentLoaded', () => {
    const elementoContador = document.getElementById('contador-visitas');
    if (!elementoContador) return;

    // Genera la URL del contador basada en tu repositorio o dominio futuro
    const siteId = 'asegema-settat-web';
    
    // Obtenemos el conteo global desde el servicio Hits
    fetch(`https://hits.seeyoufarm.com/api/count/incr/badge.json?url=https%3A%2F%2Fasegema-settat.org%2F${siteId}&count_bg=%2319641C&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false`)
        .then(response => response.json())
        .then(data => {
            if (data && data.value) {
                // Muestra la cantidad total de visitas de todos los usuarios
                elementoContador.textContent = data.value.toLocaleString('es-ES');
            }
        })
        .catch(error => {
            console.error('Error al cargar visitas globales:', error);
            elementoContador.textContent = '1';
        });
});