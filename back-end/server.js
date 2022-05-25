const express = require('express');

const routes = require('./routes');
const { PORT } = require('./config/config')

const app = express();
require('./config/express')(app);
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});