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

  Meteor.publish('competitions', async () => CompetitionsCollection.find())
})
