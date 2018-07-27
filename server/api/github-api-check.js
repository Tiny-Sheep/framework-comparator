const axios = require('axios')

const getGitHubData = async () => {
  const response = await axios.get(`https://api.github.com/repos/facebook/react`, {
    headers: {
      accept: 'application/vnd.github.v3+json'
    }
  })
  console.log("what is this response", response)

}

getGitHubData()

