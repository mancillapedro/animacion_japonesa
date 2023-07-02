import animationAPI from "../../API/index.js";
import validateFields from "../../validations/validateFields.js";

addEventListener('DOMContentLoaded', () => {
    const
        form = document.forms['formAnimation'],
        inputsAndButtons = form.querySelectorAll('input, button'),
        submitButton = form.querySelector(`[type="submit"]`);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const
            data = new FormData(form),
            validatedBody = validateFields(
                [...data.keys()].reduce((acc, current) => {
                    acc[current] = data.get(current);
                    return acc;
                }, {})
            );

        inputsAndButtons.forEach(element => element.disabled = true);
        submitButton.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Agregando...`;

        !validatedBody.errors && animationAPI
            .post(JSON.stringify(validatedBody))
            .then((res) =>
                window.location.replace(`/animations?${res.errors ? "error" : "success"}=post`)
                // setTimeout(() =>
                //     window.location
                //         .replace(`/animations?${res.errors ? "error" : "success"}=post`), 2000)
            );
    });
});