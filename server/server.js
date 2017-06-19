import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import documents from './routes/documentsRoutes';
import user from './routes/userRoutes';


const port = parseInt(process.env.PORT, 10) || 8000;

const app = express();

app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(user());
app.use(documents());

app.listen(port, () => console.log(`Papyrus started on port ${port}`));

export default app;