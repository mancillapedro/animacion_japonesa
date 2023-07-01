const modalBodyContent = (name, id) => `
    Esta acción eliminara la animación <em class="fw-bold">${name}</em> de id <em class="fw-bold">${id}</em>
    <p class="my-3">¿Desea continuar?</p>
`;

addEventListener('DOMContentLoaded', (e) => {
    const
        location = window.location,
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

            fetch(
                `${location.origin}/animations`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: Number(target.dataset.animationId) })
                }
            ).then(response => response.ok && setTimeout(() => location.reload(), 1500));
        }

    );

});