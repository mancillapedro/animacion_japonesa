import { Router } from "express";
import animationsRoutes from "./animations.js";
import apiAnimationsRoutes from "./apiAnimations.js";

const appRouter = Router();

;[
    {
        method: 'get',
        path: '/',
        handler: (req, res) => res.render('home/index', {
            title: 'Home Page Japanese Animation',
            scripts: ['/assets/js/pages/home/index.js']
        })
    },
    ...animationsRoutes,
    ...apiAnimationsRoutes,
    {
        method: 'get',
        path: '*',
        handler: (req, res) => res.render('notFound')
    }
].forEach(route =>
    appRouter[route.method](
        route.path, (...args) => route.handler(...args)
    )
);

export default appRouter;