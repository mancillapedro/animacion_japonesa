const request = async (method, body) => {
    let data = {};
    try {
        const response = await fetch(`${window.location.origin}/api/animations`,
            {
                headers: { "Content-Type": "application/json" },
                method,
                body
            });
        if (!response.ok) throw new Error("Error en conexión con la api");
        data = await response.json();
    }
    catch ({ message: requestError }) { data = { errors: { requestError } }; }
    finally { return data; }
};

export default {
    delete: (body) => request("DELETE", body),
    post: (body) => request("POST", body),
    put: (body) => request("put", body),
}

