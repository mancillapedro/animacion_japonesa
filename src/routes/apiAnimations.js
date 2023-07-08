import fileAnime from '../assets/js/fileAnime.js';
import validateFields from '../assets/js/validateFields.js';

const validId = id => Object.keys(fileAnime.read()).some(_id => Number(_id) == Number(id));

export default [
    {
        method: 'get',
        path: '/api/animations',
        handler: (_, res) => res.json(fileAnime.read())
    },
    {
        method: 'get',
        path: '/api/animations/id/:id',
        handler: ({ params }, res) => {
            const animation = fileAnime.read()[params.id];

            return (!!animation && res.json(animation)) ||
                res.status(404).json({ errors: { id: 'Animación no encontrada' } });
        }
    },
    {
        method: 'get',
        path: '/api/animations/name/:name',
        handler: ({ params }, res) => {
            const
                dataFile = fileAnime.read(),
                regexp = new RegExp(params.name, 'i'),
                animationsByName = Object.keys(dataFile).reduce((acc, id) => {
                    regexp.test(dataFile[id].nombre) && acc.push({ id, ...dataFile[id] });
                    return acc;
                }, []);

            return (!!animationsByName.length && res.json(animationsByName)) ||
                res.status(404).json({ errors: { name: 'Animación no encontrada' } });
        }
    },
    {
        method: 'post',
        path: '/api/animations',
        handler: ({ body }, res) => {
            const validatedBody = validateFields(body, ['nombre', 'genero', 'año', 'autor']);
            if (validatedBody.errors) return res.json(validatedBody);

            const
                data = fileAnime.read(),
                id = Math.max(...Object.keys(data)) + 1;

            data[id] = validatedBody;
            fileAnime.write(data);
            return res.json({ id, ...data[id] });
        }
    },
    {
        method: 'delete',
        path: '/api/animations',
        handler: ({ body }, res) => {
            const id = Number(body["id"]);
            if (!validId(id)) return res.json({ errors: { "id": "id no valido" } });

            const { [id]: removedAnimation, ...restData } = fileAnime.read();
            fileAnime.write(restData);
            return res.json({ id, ...removedAnimation });
        }
    },
    {
        method: 'put',
        path: '/api/animations',
        handler: ({ body }, res) => {
            let errors = {};
            const
                id = Number(body["id"]),
                validatedBody = validateFields(body);

            if (!validId(id)) errors['id'] = "id no valido";
            if (validatedBody.errors) errors = { ...errors, ...validatedBody.errors };
            if (Object.keys(errors).length) return res.json({ errors });

            const data = fileAnime.read();

            data[id] = validatedBody;
            fileAnime.write(data);
            return res.json({ id, ...validatedBody });
        }
    }
];