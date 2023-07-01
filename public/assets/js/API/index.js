export default (() => {
    const request = async (method, body) => {
        try {
            const response = await fetch(
                `${window.location.origin}/animations`,
                {
                    headers: { "Content-Type": "application/json" },
                    method,
                    body
                }
            );
            if (!response.ok) throw new Error("Error en conexión con la api");
            return await response.json();
        }
        catch ({ message: requestError }) { return { errors: { requestError } }; }
    };

    return {
        delete: (body) => request("DELETE", body),
        new: (body) => request("POST", body),
    };
})();

