import API_CONFIG from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contactForm');
    if (!form) {
        console.error('Formulário de contato não encontrado');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Desabilitar o botão durante o envio
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        const formData = {
            name: document.getElementById('inome').value.trim(),
            email: document.getElementById('iemail').value.trim(),
            phone: document.getElementById('inumero').value.trim(),
            message: document.getElementById('imensagem').value.trim()
        };

        // Validação básica
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Por favor, preencha todos os campos.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            return;
        }

        try {
            const response = await fetch(`${API_CONFIG.baseURL}/api/contacts`, {
                method: 'POST',
                headers: API_CONFIG.headers,
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
            console.error('Erro ao enviar mensagem:', error);
            let errorMessage = 'Ocorreu um erro ao enviar a mensagem.';
            
            if (error.message.includes('Failed to fetch')) {
                errorMessage += '\n\nO servidor parece estar inacessível. Por favor, tente novamente mais tarde.';
            } else {
                errorMessage += '\n\n' + error.message;
            }
            
            alert(errorMessage);
        } finally {
            // Reabilitar o botão após o envio (sucesso ou erro)
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}); 