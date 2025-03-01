document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logout");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("user", "logado");
            window.location.href = "index.html";
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }
});