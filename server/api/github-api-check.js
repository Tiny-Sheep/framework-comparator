const axios = require('axios')
const { Framework } = require('../db/models')
// import { GITHUB_TOKEN } from '../../secrets'

const lastWeek = new Date(Date.now() - (86400000 * 7))
const lastWeekISO = lastWeek.toISOString().split("T")[0]

const frameworkLinks = ['facebook/react', 'angular/angular.js', 'vuejs/vue', 'emberjs/ember.js']
const frameworkNames = ['react', 'angular.js', 'vuejs', 'ember.js']


const updateFramework = {}
const updateFrameworkArr = []

const getGitHubData = async () => {


  const arrOfWatcherAndIssueProms = frameworkLinks.map((frameworkLink) => {
    try {
      return axios.get(`https://api.github.com/repos/${frameworkLink}`, {
        headers: {
          accept: 'application/vnd.github.v3+json',
          Authorization: "32fc2848180291630d829b96c069954480cad514"
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
          accept: 'application/vnd.github.v3+json',
          Authorization: "32fc2848180291630d829b96c069954480cad514"
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

  const updateFrameWorks = resolvedWatcherAndIssuePromises.map((response, i) => {

    return { issues: response.data.open_issues, watchers: response.data.subscribers_count, name: response.data.name, pushes: pushesData[i] }
  })

  const updateFrameworkPromises = updateFrameWorks.map(frameworkData => {
    console.log("what is this frameworkData", frameworkData)
    return Framework.update(frameworkData, {
      where: {
        name: frameworkData.name
      }
    })
  })

  const updatedFrameWorks = Promise.all(updateFrameworkPromises)

  console.log("my updated frameworks", updatedFrameWorks)

  // console.log("resolved push promises", resolvedPushPromises)



  // next loop through this data





  // console.log("what is in this array of issue?", arrayOfIssues)

  // frameworkNames.map((frameworkName) => {
  //   const responseForPushes = axios.get(`https://api.github.com/search/repositories?q=${frameworkName}+in:name,description,readme+pushed:>${lastWeekISO}`, {
  //     headers: {
  //       accept: 'application/vnd.github.v3+json'
  //     }
  //   })
  //   arrayOfPushes.push(responseForPushes)
  // })

  // const resolvedWatchersAndIssues = Promise.all(...arrayOfIssues)
  // const resolvedPushes = Promise.all(...arrayOfPushes)

  // console.log("what is in each of these arrays", resolvedWatchersAndIssues)
  // console.log("what is in each of these arrays", resolvedPushes)

  // const commits = await axios.get(`https://api.github.com/search/repositories?q=vuejs+in:name,description,readme+pushed:>${lastWeekISO}`, {
  //   headers: {
  //     accept: 'application/vnd.github.v3+json'
  //   }
  // })

  // console.log("what is in my commits response", commits)


  // const { open_issues, subscribers_count } = response.data
  // const { total_count } = commits.data

  // console.log("number of open issues", open_issues)
  // console.log("number of watchers", subscribers_count)
  // console.log("number of pushes for emberjs", total_count)
}


getGitHubData()


