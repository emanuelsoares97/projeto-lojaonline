document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) return; // Se o botão de login não existir, sai

    const user = localStorage.getItem("user");

    if (user) {
        // Trocar o botão de login pelo nome do utilizador + logout
        loginBtn.innerHTML = `<i class="material-icons">person</i> ${user} | 
        <a href="#" id="logoutBtn"><i class="material-icons">logout</i> Sair</a>`;
        loginBtn.href = "#"; // Impede que o link leve ao login

        // Adicionar evento de logout
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.reload(); // Recarrega a página
        });
    }
});
