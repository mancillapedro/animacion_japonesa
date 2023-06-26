import fileAnime from "./fileAnime.js";

const validations = {
    "id": (id) => {
        const validId = Object.keys(fileAnime.read()).some(_id => Number(_id) == Number(id));
        if (!validId) throw new Error("id no valido");
        return Number(id);
    },
    "nombre": (nombre) => {
        if (!String(nombre).trim()) throw new Error("nombre invalido");
        return String(nombre);
    },
    "genero": (genero) => {
        if (!String(genero).trim()) throw new Error("genero invalido");
        return String(genero);
    },
    "año": (year) => {
        const
            MIN_YEAR = 1800,
            MAX_YEAR = new Date().getFullYear();
        if (!(Number(year) > MIN_YEAR && Number(year) < MAX_YEAR))
            throw new Error('año no valido');
        return Number(year);
    },
    "autor": (autor) => {
        if (!String(autor).trim()) throw new Error("autor invalido");
        return String(autor);
    }
};

export default (body, fields = Object.keys(validations)) => {
    const
        errors = {},
        validatedFields = {};

    for (const field of fields) {
        if (!validations[field]) throw new Error(`undefined validation for field ${field}`);
        try { validatedFields[field] = validations[field](body[field]); }
        catch (e) { errors[field] = e.message; }
    }

    return Object.keys(errors).length ? { errors } : validatedFields;
};