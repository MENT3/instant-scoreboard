import { Meteor } from 'meteor/meteor'
import { CompetitionsCollection } from '/imports/api/competitions'

const insertCompetition = async payload => {
  await CompetitionsCollection.insertAsync(payload)
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await CompetitionsCollection.find().countAsync()) === 0) {
    await insertCompetition({
      name: 'Affiliates',
      wods: [
        {
          description: '21-15-9 Thrusters',
          scores: [
            {
              athlete: { name: 'Jules Castor' },
              judge: { name: 'Tristan le judge' },
              value: 43
            }
          ]
        }
      ]
    })
  }

  Meteor.publish('competitions', () =>
    CompetitionsCollection.find({ _id: 'TS4C4ZXD4vzrJsym5' })
  )
})
