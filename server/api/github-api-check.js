const axios = require('axios')
const { Framework } = require('../db/models')
// import { GITHUB_TOKEN } from '../../secrets'

const lastWeek = new Date(Date.now() - (86400000 * 7))
const lastWeekISO = lastWeek.toISOString().split("T")[0]

const frameworkLinks = ['facebook/react', 'angular/angular.js', 'vuejs/vue', 'emberjs/ember.js']
const frameworkNames = ['react.js', 'angular.js', 'vuejs', 'ember.js']


const getGitHubData = async () => {


  const arrOfWatcherAndIssueProms = frameworkLinks.map((frameworkLink) => {
    try {
      return axios.get(`https://api.github.com/repos/${frameworkLink}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: "token d76505ac81000ae8ce52f9cb963741ce1c4728e2"
        }
      })
    } catch (err) {
      console.error(err)
    }
  })

  const arrOfPushesProms = frameworkNames.map((frameworkName) => {
    try {
      return axios.get(`https://api.github.com/search/repositories?q=${frameworkName}+in:name,description,readme+pushed:>${lastWeekISO}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: "token d76505ac81000ae8ce52f9cb963741ce1c4728e2"
        }
      })

    } catch (err) {
      console.error(err)
    }
  })

  const resolvedPushPromises = await Promise.all(arrOfPushesProms)
  const resolvedWatcherAndIssuePromises = await Promise.all(arrOfWatcherAndIssueProms)
  const pushesData = resolvedPushPromises.map((push) => {
    return push.data.total_count
  })

  const frameWorksWithStats = resolvedWatcherAndIssuePromises.map((response, i) => {
    return {
      issues: response.data.open_issues,
      watchers: response.data.subscribers_count,
      name: response.data.name,
      pushes: pushesData[i]
    }
  })

  console.log("what is in this updateFrameworks?", frameWorksWithStats)
  const frameworks = await Framework.findAll()
  const updateFrameworks = await Promise.all(frameworks.map((framework, index) => {
    console.log(frameWorksWithStats[index])
    return framework.update(frameWorksWithStats[index])
  }))


}

getGitHubData()




