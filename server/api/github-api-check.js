const axios = require('axios')
const { Framework } = require('../db/models')


const lastWeek = new Date(Date.now() - (86400000 * 7))
const lastWeekISO = lastWeek.toISOString().split("T")[0]

const frameworkLinks = ['facebook/react', 'angular/angular.js', 'vuejs/vue', 'emberjs/ember.js']

const getGitHubData = async () => {

  const updateFramework = {}

  const updateFrameworkArr = []

  frameworkLinks.map((frameworkLink) => {
    axios.get(`https://api.github.com/repos/${frameworkLink}`, {
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    }).then(async (response) => {

      updateFramework.name = response.data.name
      updateFramework.watchers = response.data.subscribers_count
      updateFramework.issues = response.data.open_issues
      updateFrameworkArr.push(updateFramework)


    })

  })

  console.log("this array should be filled", updateFrameworkArr)

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

