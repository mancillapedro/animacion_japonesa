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
        path: '/animations/id/:id',
        handler: ({ params }, res) => res.render(
            'animations/id',
            {
                id: params.id,
                scripts: ['/assets/js/pages/animations/id.js'],
                animation: fileAnime.read()[params.id]
            }
        )
    },
    {
        method: 'get',
        path: '/animations/name/:name',
        handler: ({ params }, res) => {
            let someAnimation = false;
            const
                dataFile = fileAnime.read(),
                regexp = new RegExp(params.name, 'i'),
                animationsByName = Object.keys(dataFile).reduce((acc, id) => {
                    regexp.test(dataFile[id].nombre)
                        && (acc[id] = dataFile[id])
                        && (someAnimation = true);
                    return acc;
                }, {});

            res.render(
                'animations/name',
                {
                    scripts: ['/assets/js/pages/animations/name.js'],
                    ...params,
                    content: someAnimation ? animationsByName : null
                }
            );
        }
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