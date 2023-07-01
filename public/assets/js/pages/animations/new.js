addEventListener('DOMContentLoaded', () => {
    const form = document.forms['formAnimation'];
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const objData = JSON.stringify(
            [...data.keys()].reduce((acc, current) => {
                acc[current] = data.get(current);
                return acc;
            }, {})
        );

        fetch(
            `${location.origin}/animations`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: objData
            }
        );
    });
});