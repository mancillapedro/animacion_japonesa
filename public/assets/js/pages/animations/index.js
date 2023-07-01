import animationAPI from "../../API/index.js";

const
    modalBodyContent = (name, id) => `
    Esta acción eliminara la animación <em class="fw-bold">${name}</em> de id <em class="fw-bold">${id}</em>
    <p class="my-3">¿Desea continuar?</p>
`;

addEventListener('DOMContentLoaded', (e) => {
    const
        modal = document.querySelector('#modalDelete'),
        modalBody = modal.querySelector('.modal-body'),
        buttonConfirmDelete = modal.querySelector(`[data-delete-confirm]`);

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
            buttonConfirmDelete.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Eliminando...`;
            const body = JSON.stringify({ id: Number(target.dataset.animationId) });
            animationAPI.delete(body)
                .then(() => window.location.search = 'success=delete');
            // .then(() => setTimeout(() => window.location.search = 'success=delete', 2000));
        }
    );

});