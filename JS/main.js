document.addEventListener("DOMContentLoaded", () => {
    // Declaramos las posibles rutas según la estructura de carpetas
    const RUTA_JSON = "JSON/membres.json";
    const RUTA_JSON_MIN = "json/membres.json";

    async function inicializarCifras() {
        let miembros = null;

        try {
            // Intentar cargar primero con carpeta mayúscula y luego minúscula
            let respuesta = await fetch(RUTA_JSON);
            if (!respuesta.ok) {
                respuesta = await fetch(RUTA_JSON_MIN);
            }

            if (!respuesta.ok) {
                console.error(`❌ No se pudo cargar el archivo JSON. Estado HTTP: ${respuesta.status}`);
                return;
            }

            miembros = await respuesta.json();
            console.log("✅ JSON cargado con éxito. Total registros:", miembros.length);

            const conteos = calcularEstadisticas(miembros);
            console.log("📊 Cifras procesadas:", conteos);

            ejecutarConteo(conteos);

        } catch (error) {
            console.error("❌ Error al procesar el archivo JSON:", error);
        }
    }

    function calcularEstadisticas(lista) {
        const stats = {
            total: lista.length, // Debería dar 38
            feg: 0,
            fst: 0,
            fsjp: 0,
            encg: 0,
            btp: 0,
            i3s: 0,
            bureau: 9
        };

        lista.forEach(m => {
            const fac = (m.facultad || "").toUpperCase().trim();

            if (fac.includes("FEG")) {
                stats.feg++;
            } else if (fac.includes("FST")) {
                stats.fst++;
            } else if (fac.includes("FSJP")) {
                stats.fsjp++;
            } else if (fac.includes("ENCG")) {
                stats.encg++;
            } else if (fac.includes("BTP") || fac.includes("MOHAMED") || fac.includes("MOHAMMED")) {
                stats.btp++;
            } else if (fac.includes("I3S")) {
                stats.i3s++;
            }
        });

        return stats;
    }

    function animarNumero(idElemento, valorFinal, duracion = 1200) {
        const el = document.getElementById(idElemento);
        if (!el) return;

        let inicio = 0;
        const pasos = 30;
        const incremento = valorFinal / pasos;
        const tiempoPaso = duracion / pasos;

        const timer = setInterval(() => {
            inicio += incremento;
            if (inicio >= valorFinal) {
                el.textContent = valorFinal;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(inicio);
            }
        }, tiempoPaso);
    }

    function ejecutarConteo(conteos) {
        animarNumero("stat-total", conteos.total);
        animarNumero("stat-feg", conteos.feg);
        animarNumero("stat-fst", conteos.fst);
        animarNumero("stat-fsjp", conteos.fsjp);
        animarNumero("stat-encg", conteos.encg);
        animarNumero("stat-btp", conteos.btp);
        animarNumero("stat-i3s", conteos.i3s);
        animarNumero("stat-bureau", conteos.bureau);
    }

    inicializarCifras();
});