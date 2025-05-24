import API_CONFIG from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.formulario form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Desabilitar o botão durante o envio
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        const formData = {
            name: document.getElementById('inome').value,
            email: document.getElementById('iemail').value,
            phone: document.getElementById('inumero').value,
            message: document.getElementById('imensagem').value
        };

        try {
            const response = await fetch(`${API_CONFIG.baseURL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
                form.reset();
            } else {
                throw new Error(data.message || 'Erro ao enviar mensagem');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
        } finally {
            // Reabilitar o botão após o envio (sucesso ou erro)
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}); 