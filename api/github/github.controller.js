const axios = require('axios');
const github = require('../config/github');

const github_login_url = 'https://github.com/login/oauth/access_token?';
const github_user_url = 'https://api.github.com/user'

const githubAuth = async (req, res) => {
  
  const code = req.body.code;

  axios
    .post(
      `${github_login_url}client_id=${github.CLIENT_ID}&client_secret=${github.CLIENT_SECRET}&code=${code}&redirect_uri=${github.REDIRECT_URL}`
    )
    .then( async (result) => {
      const token = result.data;
      let params = new URLSearchParams(token);
      const access_token = params.get('access_token');

      const user_data = await axios.get(github_user_url, {
        headers: {
          Authorization: `token ${access_token}`
        }
      })
      const user = { ...user_data.data, access_token };
      res.send(user)
      return user;
    })

    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  githubAuth,
};
