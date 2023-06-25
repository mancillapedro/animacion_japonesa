import fileAnime from '../assets/js/fileAnime.js';
import validateFields from '../assets/js/validateFields.js';

export default [
    {
        method: 'get',
        path: '/animations',
        handler: (_, res) => res.render(
            'animation/index',
            {
                title: 'All Japanese Animations',
                content: fileAnime.read()
            }
        )
    },
    {
        method: 'get',
        path: '/animations/new',
        handler: (req, res) => {
            res.render(
                'animation/new',
                {
                    title: 'New Japanese Animation Page',
                    fields: {
                        nombre: null,
                        genero: null,
                        año: null,
                        autor: null
                    }
                }
            );
        }
    },
    // {
    //     method: 'get',
    //     path: '/animations/search',
    //     view: 'animation/show',
    //     params: {
    //         title: 'Home Page Japanese Animation',
    //     },
    //     handler: function (req, res) {
    //         req.query.q = req.query.q || '';
    //         res.render(this.view, { ...this.params });
    //     }
    // },
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
            res.json({ id, ...data[id] });
        }
    },
    {
        method: 'delete',
        path: '/animations',
        handler: ({ body }, res) => {
            const validatedBody = validateFields(body, ['id']);
            if (validatedBody.errors) return res.json(validatedBody);

            const
                { id } = validatedBody,
                { [id]: removedAnimation, ...restData } = fileAnime.read();

            fileAnime.write(restData);
            res.json({ id, ...removedAnimation });
        }
    },
    {
        method: 'put',
        path: '/animations',
        handler: ({ body }, res) => {
            const validatedBody = validateFields(body);
            if (validatedBody.errors) return res.json(validatedBody);

            const
                data = fileAnime.read(),
                { id, ...restBody } = validatedBody;

            data[id] = restBody;
            fileAnime.write(data);
            res.json(validatedBody);
        }
    }
];