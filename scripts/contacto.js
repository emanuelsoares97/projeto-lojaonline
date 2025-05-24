document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.formulario form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('inome').value,
            email: document.getElementById('iemail').value,
            phone: document.getElementById('inumero').value,
            message: document.getElementById('imensagem').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/contacts', {
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
        }
    });
}); 