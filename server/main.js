import { Meteor } from 'meteor/meteor'
import { CompetitionsCollection } from '/imports/api/competitions'

const insertCompetition = async ({ name }) => {
  await CompetitionsCollection.insertAsync({ name })
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await CompetitionsCollection.find().countAsync()) === 0) {
    await insertCompetition({
      name: 'Affiliates'
    })
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish('links', () => CompetitionsCollection.find())
})
