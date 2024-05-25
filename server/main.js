import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

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

  Meteor.methods({
    'scores.inc'(scoreId) {
      check(scoreId, String)

      CompetitionsCollection.update(
        { 'wods.scores._id': scoreId },
        {
          $inc: {
            'wods.$[].scores.$[score].value': 1
          }
        },
        {
          arrayFilters: [{ 'score._id': scoreId }]
        }
      )
    },

    'scores.dec'(scoreId) {
      check(scoreId, String)

      CompetitionsCollection.update(
        { 'wods.scores._id': scoreId },
        {
          $inc: {
            'wods.$[].scores.$[score].value': -1
          }
        },
        {
          arrayFilters: [{ 'score._id': scoreId }]
        }
      )
    }
  })
})
