const
    modalBodyContent = (name, id) => `
    Esta acción eliminara la animación <em class="fw-bold">${name}</em> de id <em class="fw-bold">${id}</em>
    <p class="my-3">¿Desea continuar?</p>
`,
    deleteAnimation = async (body) => {
        try {
            const response = await fetch(
                `${window.location.origin}/animations`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body
                }
            );
            if (!response.ok) throw "Error en conexión con la api";
            return await response.json();
        }
        catch ({ message }) {
            console.log(message);
            return message;
        }

    };

addEventListener('DOMContentLoaded', (e) => {
    const
        modal = document.querySelector('#modalDelete'),
        modalBody = modal.querySelector('.modal-body'),
        buttonConfirmDelete = modal.querySelector(`[data-delete-confirm]`),
        spinner = buttonConfirmDelete.querySelector(`[role="status"]`);

    document.querySelectorAll(`[data-bs-toggle="modal"]`)
        .forEach(
            button => button.addEventListener(
                'click',
                ({ target }) => {
                    const { deleteName: name, deleteId: id } = target.dataset;
                    modalBody.innerHTML = modalBodyContent(name, id);
                    buttonConfirmDelete.dataset.animationId = id;
                })
        );

    buttonConfirmDelete.addEventListener('click',
        ({ target }) => {
            modal.querySelectorAll('button').forEach(button => button.disabled = true);
            spinner.classList.remove('d-none');
            const body = JSON.stringify({ id: Number(target.dataset.animationId) });
            deleteAnimation(body)
                .then(() => setTimeout(() => window.location.search = 'success=delete', 3000));
        }

    );

});