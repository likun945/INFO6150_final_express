const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const customResponseMiddleware = require('./middlewares/response');
const dbService = require('./services/dbService');
const cors = require('cors');

const app = express();
app.use(customResponseMiddleware);
app.use(cors());
dbService.connectToDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => {
    console.log(req)
})
app.use('/api', routes);

const PORT = process.env.PORT || 3000; // 使用 Heroku 提供的端口或默认到 3000
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
});
