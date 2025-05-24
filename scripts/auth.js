// Função para verificar e atualizar o estado de autenticação
function checkAuthState() {
    const loginBtn = document.getElementById("loginBtn");
    if (!loginBtn) return;

    const user = localStorage.getItem("user");
    if (user) {
        // Trocar o botão de login pelo nome do utilizador + logout
        loginBtn.innerHTML = `<i class="material-icons">person</i> ${user} | 
        <a href="#" id="logoutBtn"><i class="material-icons">logout</i> Sair</a>`;
        loginBtn.href = "#";

        // Adicionar evento de logout
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                localStorage.removeItem("user");
                window.location.reload();
            });
        }
    }
}

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
    return localStorage.getItem("user") !== null;
}

// Função para redirecionar se não estiver logado
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Inicialização do login
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Se estiver na página de login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;

            if (username.trim() !== "") {
                localStorage.setItem("user", username);
                
                // Redireciona para a página anterior ou para index.html
                const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
                window.location.href = returnUrl || "index.html";
            } else {
                alert("Por favor, insira um nome de utilizador.");
            }
        });
    } else {
        // Se não estiver na página de login, verifica o estado de autenticação
        checkAuthState();
    }
});

