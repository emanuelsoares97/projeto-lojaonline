document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const menuIcon = document.querySelector(".menu-icon");

    menuIcon.addEventListener("click", function () {
        menu.classList.toggle("active"); // Alterna entre mostrar/ocultar o menu
    });
});
