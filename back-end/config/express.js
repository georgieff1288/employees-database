const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { ACCESS_HEADER_PORT } = require('./config');

module.exports = function(app){
    app.use(cookieParser());

    app.use(cors({origin: [
        `http://localhost:${ACCESS_HEADER_PORT}`
    ], credentials: true}));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
};