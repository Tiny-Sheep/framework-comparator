'use strict'

const db = require('../server/db')
const { Vote, Framework } = require('../server/db/models')



async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')


  const Votes = await Promise.all([
    Vote.create({ email: 'cody@email.com', }),
    Vote.create({ email: 'laminey@email.com', }),
    Vote.create({ email: 'mo@email.com', }),
    Vote.create({ email: 'murphy@email.com', })
  ])

  const frameworks = await Promise.all([
    Framework.create({ name: "react", watchers: 0, issues: 0, pushes: 0, votes: 0 }),
    Framework.create({ name: "angular.js", watchers: 0, issues: 0, pushes: 0, votes: 0 }),
    Framework.create({ name: "vuejs", watchers: 0, issues: 0, pushes: 0, votes: 0 }),
    Framework.create({ name: "ember.js", watchers: 0, issues: 0, pushes: 0, votes: 0 }),
  ])

  const voteInst = await Vote.findAll()
  const frameworkInst = await Framework.findAll()

  await Promise.all(voteInst.map((vote, idx) => {
    return vote.setFramework(frameworkInst[idx])
  }))

  // await Promise.all()





  console.log(`seeded ${Votes.length} votes`)
  console.log(`seeded ${frameworks.length} frameworks`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
