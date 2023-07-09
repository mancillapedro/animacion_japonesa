import animationAPI from "../API/index.js";

const modal = document.createElement('div');

modal.innerHTML = `
<div
    class="modal fade"
    id="modalDelete"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalDeleteLabel"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1
                    class="modal-title fs-5"
                    id="modalDeleteLabel"
                >Eliminar animación</h1>
            </div>
            <div class="modal-body text-center">

            </div>
            <div class="modal-footer justify-content-evenly">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >Cancelar</button>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-delete-confirm
                    data-animation-id
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</div>
`;

export default () => {

    document.body.append(modal);

    const
        modalBody = modal.querySelector('.modal-body'),
        buttonConfirmDelete = modal.querySelector(`[data-delete-confirm]`),
        modalBodyContent = (name, id) => `
            Esta acción eliminara la animación <em class="fw-bold">${name}</em> de id <em class="fw-bold">${id}</em>
            <p class="my-3">¿Desea continuar?</p>`;

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
                .then(() => window.location.href = '/animations?success=delete');
        }
    );
};
