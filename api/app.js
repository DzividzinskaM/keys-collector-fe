const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const User = require('./user/user.controller');
const GitHub = require('./github/github.controller');

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('main page');
});

app.get('/users', User.users);
app.post('/user', User.auth);
app.delete('/user/:id', User.deleteUser);

app.post('/github', GitHub.githubAuth)

app.listen(port, () => {
  console.log(`Server has been started: ${port}`);
});