const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const pe = require('parse-error');
const passport = require('passport');
const cors = require('cors');
const userRoutes = require('../routes/user.route');
const postRoutes = require('../routes/post.route');
// const authRoutes = require('../routes/auth.route');

const port = 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors());

//set up server to use passport middleware and passport config
app.use(passport.initialize());
app.use(passport.session());
require('../config/passport.js')(passport);
// require('../config/google_auth.js')(passport);

app.get('/', (req, res) => res.send('Hello World'));
app.use('/user', userRoutes);
app.use('/posts', postRoutes);
// app.use('/auth', authRoutes);

app.listen(port, () => console.log('server listening on port ' + port));
