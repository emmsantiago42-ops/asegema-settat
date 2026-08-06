document.addEventListener('DOMContentLoaded', () => {
    const tickerTrack = document.getElementById('ticker-track');
    const btnPause = document.getElementById('ticker-pause');
    const btnPrev = document.getElementById('ticker-prev');
    const btnNext = document.getElementById('ticker-next');

    if (!tickerTrack) return;

    let isPaused = false;
    let speed = 35; // Segundos que tarda la animación

    async function cargarNoticiasTicker() {
        try {
            const response = await fetch('JSON/noticias.json');
            if (!response.ok) throw new Error('Error al cargar noticias');
            
            const noticias = await response.json();

            if (!noticias || noticias.length === 0) return;

            // Generar los elementos enlazados
            const itemsHtml = noticias.map(item => 
                `<a href="noticia.html?id=${item.id}" class="ticker-item">✦ ${item.titulo}</a>`
            ).join('');

            // Duplicar el contenido 2 veces para generar un bucle continuo sin huecos en blanco
            tickerTrack.innerHTML = itemsHtml + itemsHtml;

        } catch (error) {
            console.error('Error al inicializar la banda de noticias:', error);
        }
    }

    // Control del botón Pausa / Play
    if (btnPause) {
        btnPause.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                tickerTrack.classList.add('paused');
                btnPause.textContent = '▶';
            } else {
                tickerTrack.classList.remove('paused');
                btnPause.textContent = '❚❚';
            }
        });
    }

    // Pausar automáticamente cuando el usuario pasa el ratón por encima del texto
    tickerTrack.addEventListener('mouseenter', () => tickerTrack.classList.add('paused'));
    tickerTrack.addEventListener('mouseleave', () => {
        if (!isPaused) tickerTrack.classList.remove('paused');
    });

    // Botones de acelerar / ralentizar dirección
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            speed = Math.max(10, speed - 5);
            tickerTrack.style.animationDuration = `${speed}s`;
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            speed += 5;
            tickerTrack.style.animationDuration = `${speed}s`;
        });
    }

    cargarNoticiasTicker();
});