document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las imágenes, párrafos y widgets
    const imagenes = document.querySelectorAll('img');
    const parrafos = document.querySelectorAll('.entrada p');
    const widgets = document.querySelectorAll('.widget-curso');
    const sobreNosotrosTexto = document.querySelectorAll('.sobre-nosotros__texto');
    const cursosDescripcion = document.querySelectorAll('.curso__descripcion');
    
    // Alternar la clase 'derecha' en imágenes pares
    imagenes.forEach((img, index) => {
        if (index % 2 === 1) {
            img.classList.add('derecha');
        }
    });

    // Función para verificar si un elemento está en el viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight &&
            rect.bottom >= 0
        );
    };

    // Función para manejar el scroll
    const handleScroll = () => {
        // Animar imágenes
        imagenes.forEach(imagen => {
            if (isInViewport(imagen)) {
                imagen.classList.add('visible');
            }
        });

        // Animar párrafos
        parrafos.forEach(parrafo => {
            if (isInViewport(parrafo)) {
                parrafo.classList.add('visible');
            }
        });

        // Animar widgets
        widgets.forEach(widget => {
            if (isInViewport(widget)) {
                widget.classList.add('visible');
            }
        });

        // Animar textos de sobre nosotros
        sobreNosotrosTexto.forEach(texto => {
            if (isInViewport(texto)) {
                texto.classList.add('visible');
            }
        });

        // Animar descripciones de cursos
        cursosDescripcion.forEach(descripcion => {
            if (isInViewport(descripcion)) {
                descripcion.classList.add('visible');
            }
        });
    };

    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Pequeño retraso inicial para asegurar que los elementos se carguen
    setTimeout(handleScroll, 100);
}); 