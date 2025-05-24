document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevenção do comportamento padrão do formulário

            const username = document.getElementById("username").value;

            // Validação do nome de utilizador
            if (username.trim() !== "") {
                localStorage.setItem("user", username); // Armazenamento da sessão
                window.location.href = "index.html"; // Redirecionamento após login
            } else {
                alert("Por favor, insira um nome de utilizador.");
            }
        });
    }
});

