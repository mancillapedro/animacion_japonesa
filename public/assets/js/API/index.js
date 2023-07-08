export default (() => {
    const request = async (method, body) => {
        try {
            const response = await fetch(
                `${window.location.origin}/api/animations`,
                {
                    headers: { "Content-Type": "application/json" },
                    method,
                    body
                }
            );
            if (!response.ok) throw new Error("Error en conexión con la api");
            return await response.json();
        }
        catch ({ message: requestError }) {
            console.log(requestError);

            return { errors: { requestError } };
        }
    };

    return {
        delete: (body) => request("DELETE", body),
        post: (body) => request("POST", body),
        put: (body) => request("put", body),
    };
})();

