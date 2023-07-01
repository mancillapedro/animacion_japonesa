import fileAnime from '../assets/js/fileAnime.js';
import validateFields from '../assets/js/validateFields.js';

const validId = id => Object.keys(fileAnime.read()).some(_id => Number(_id) == Number(id));

export default [
    {
        method: 'get',
        path: '/animations',
        handler: ({ query }, res) => res.render(
            'animation/index',
            {
                title: 'All Japanese Animations',
                scripts: ['/assets/js/pages/animations/index.js'],
                content: fileAnime.read(),
                query
            }
        )
    },
    {
        method: 'get',
        path: '/animations/new',
        handler: (req, res) => res.render(
            'animation/new',
            {
                title: 'New Japanese Animation Page',
                scripts: ['/assets/js/pages/animations/new.js'],
                fields: {
                    nombre: null,
                    genero: null,
                    año: null,
                    autor: null
                }
            }
        )
    },
    {
        method: 'get',
        path: '/animations/:id',
        handler: ({ params }, res) => res.render(
            'animation/show',
            {
                ...params,
                ...fileAnime.read()[params.id]
            }
        )
    },
    {
        method: 'get',
        path: '/animations/:id/edit',
        handler: ({ params }, res) => res.render(
            'animation/edit',
            {
                fields: fileAnime.read()[params.id]

            }
        )
    },
    {
        method: 'post',
        path: '/animations',
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
        path: '/animations',
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
        path: '/animations',
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