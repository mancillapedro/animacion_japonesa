import fileAnime from '../assets/js/fileAnime.js';

export default [
    {
        method: 'get',
        path: '/animations',
        handler: ({ query }, res) => res.render(
            'animations/index',
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
            'animations/new',
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
            'animations/show',
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
            'animations/edit',
            {
                scripts: ['/assets/js/pages/animations/edit.js'],
                fields: fileAnime.read()[params.id]
            }
        )
    }
];