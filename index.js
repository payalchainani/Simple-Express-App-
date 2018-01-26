const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/api.route');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    return res.status(200).send('Server is working.');
});

app.use('/api', apiRouter);
app.use(function (err, req, res, next) {
    if (err.status === 404) {
        return res.status(404).send(err);
    }
    return next(err);
});

app.use(function (err, req, res) {
    return res.status(500).send(err);
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
});