const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const customResponseMiddleware = require('./middlewares/response');
const dbService = require('./services/dbService');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(customResponseMiddleware);
app.use(cors());
dbService.connectToDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});