import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import {
  CompetitionsCollection,
  WodsCollection
} from '/imports/api/collections'

const insertCompetition = async payload => {
  await CompetitionsCollection.insertAsync(payload)
}

const insertWod = async payload => {
  await WodsCollection.insertAsync(payload)
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

  if ((await WodsCollection.find().countAsync()) === 0) {
    await insertWod({
      name: 'Fran',
      rounds: [
        [
          { noRep: 21, movementName: 'Thuster', type: 'rep' },
          { noRep: 21, movementName: 'Chest to bar', type: 'rep' }
        ],
        [
          { noRep: 15, movementName: 'Thuster', type: 'rep' },
          { noRep: 15, movementName: 'Chest to bar', type: 'rep' }
        ],
        [
          { noRep: 9, movementName: 'Thuster', type: 'rep' },
          { noRep: 9, movementName: 'Chest to bar', type: 'rep' }
        ]
      ]
    })
  }

  Meteor.publish('competitions', () => CompetitionsCollection.find())

  Meteor.publish('wodById', id => WodsCollection.find({ _id: id }))

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
