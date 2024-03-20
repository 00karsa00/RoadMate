const express = require('express');
const session = require('express-session');

const app = express();
const bodyParser = require('body-parser');
const router = require('./src/router');


const viewRouter = require('./src/viewRouter')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'test123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000000 }
}));

app.use('/api', router);
app.use('/', viewRouter);
app.set('view engine', 'ejs');
app.listen(8081, () => {
    console.log('Server Start on Port 8081');
})