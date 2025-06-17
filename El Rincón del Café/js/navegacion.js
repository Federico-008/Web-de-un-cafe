document.addEventListener('DOMContentLoaded', function() {
    const menuMobile = document.querySelector('.menu-mobile');
    const navegacion = document.querySelector('.navegacion');
    const enlaces = document.querySelectorAll('.navegacion__enlace');

    // Toggle menú móvil
    menuMobile.addEventListener('click', function() {
        this.classList.toggle('activo');
        navegacion.classList.toggle('activo');
    });

    // Cerrar menú al hacer click en un enlace
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function() {
            menuMobile.classList.remove('activo');
            navegacion.classList.remove('activo');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!navegacion.contains(e.target) && !menuMobile.contains(e.target)) {
            menuMobile.classList.remove('activo');
            navegacion.classList.remove('activo');
        }
    });
}); 