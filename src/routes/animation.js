import fs from 'fs';
const fileAnime = (() => {
    const file = () => new URL('./../assets/json/anime.json', import.meta.url).pathname;
    return {
        read: () => JSON.parse(fs.readFileSync(file(), 'utf8')),
        write: (data) => fs.writeFileSync(file(), JSON.stringify(data), 'utf8')
    };
})();

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
    {
        method: 'get',
        path: '/animations/search',
        view: 'animation/show',
        params: {
            title: 'Home Page Japanese Animation',
        },
        handler: function (req, res) {
            req.query.q = req.query.q || '';
            res.render(this.view, { ...this.params });
        }
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
            { fields: fileAnime.read()[params.id] }
        )
    },
    {
        method: 'post',
        path: '/animations/:id',
        // view: 'animation/index',
        // handler: function (req, res, next) {
        //     res.send('Hello World!');
        //     next()
        // }
    }
];