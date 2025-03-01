document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o formulário de recarregar a página

            const username = document.getElementById("username").value;

            if (username.trim() !== "") { // Verifica se o campo não está vazio
                localStorage.setItem("user", username); // Guarda o nome no localStorage
                window.location.href = "index.html"; // Redireciona para a página principal
            } else {
                alert("Por favor, insira um nome de utilizador.");
            }
        });
    }
});

