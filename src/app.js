import express from 'express';
import hbs from 'hbs';
import router from './routes/index.js';

const app = express();

app.use(express.static(`./public`));
app.use("/assets/js/validations/validateFields.js", express.static(`./src/assets/js/validateFields.js`));
app.use(express.json());

app.use(router);

hbs.registerPartials('./src/views/partials');
hbs.registerHelper('concat', (...args) => args.filter(arg => typeof arg != "object").join(''));
hbs.registerHelper('keyIsYear', key => key == "año");

app.set('view engine', 'hbs');
app.set('views', './src/views');

export default app;