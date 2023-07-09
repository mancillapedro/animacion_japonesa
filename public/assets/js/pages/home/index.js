addEventListener('DOMContentLoaded', () => {
    const
        form = document.forms['searchAnimation'],
        input = form.querySelector('input#search'),
        optionSearch = document.forms['optionSearch']

    form.addEventListener('submit', event => {
        event.preventDefault()
        event.stopPropagation()
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            form.querySelector('input[name="searchType"]:checked')
            const
                { value: path } = optionSearch.querySelector('input[name="searchType"]:checked'),
                animation = input.value.trim()
            animation && (window.location.href = `/animations/${path}/${animation}`)
        }
    })
})