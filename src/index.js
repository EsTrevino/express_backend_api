const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const pe = require('parse-error');
const passport = require('passport');
const cors = require('cors');
const userRoutes = require('../routes/user.route');

const port = 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors());
//set up server to use passport middleware and passport config
app.use(passport.initialize());
require('../config/passport.js')(passport);

app.get('/', (req, res) => res.send('Hello World'));
app.use('/user', userRoutes);

app.listen(port, () => console.log('server listening on port ' + port));
