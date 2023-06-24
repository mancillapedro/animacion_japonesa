import { Router } from "express";
import animationRoutes from "./animation.js";

const appRouter = Router();

;[
    {
        method: 'get',
        path: '/',
        view: 'home/index',
        params: {
            title: 'Home Page Japanese Animation',
        },
        handler: function (req, res) {
            res.render(this.view, this.params);
        }
    },
    ...animationRoutes,
].forEach(route =>
    appRouter[route.method](
        route.path, (...args) => route.handler(...args)
    )
);

export default appRouter;