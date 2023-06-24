import express from 'express';
import hbs from 'hbs';
import router from './src/routes/index.js';

const __dirname = new URL('./', import.meta.url).pathname;

const app = express();
const port = 3000;

app.use(router);
app.use(express.static(`${__dirname}/public`));

hbs.registerPartials(__dirname + '/src/views/partials');
hbs.registerHelper('concat', (...args) => args.filter(arg => typeof arg != "object").join(''));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');

app.listen(port, () => console.log(`escuchando en http://localhost:${port}`));
