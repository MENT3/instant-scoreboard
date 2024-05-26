import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

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
      ],
      scores: [
        {
          _id: '6652d0ced431ac8ebec115ae',
          athlete: { name: 'Jules CASTOR' },
          judge: { name: 'Tristan le juge' },
          value: 0
        }
      ]
    })
  }

  Meteor.publish('competitions', () => CompetitionsCollection.find())

  Meteor.publish('wod-by-id-with-score', function (wodId, scoreId) {
    check(wodId, String)
    check(scoreId, String)

    return WodsCollection.find(
      { _id: wodId, 'scores._id': scoreId },
      {
        fields: {
          _id: 1,
          name: 1,
          rounds: 1,
          scores: { $elemMatch: { _id: scoreId } }
        }
      }
    )
  })

  Meteor.methods({
    'scores.inc'(scoreId) {
      check(scoreId, String)

      console.log(scoreId)

      WodsCollection.update(
        { 'scores._id': scoreId },
        {
          $inc: {
            'scores.$[score].value': 1
          }
        },
        {
          arrayFilters: [{ 'score._id': scoreId }]
        }
      )
    },

    'scores.dec'(scoreId) {
      check(scoreId, String)

      console.log(scoreId)

      WodsCollection.update(
        { 'scores._id': scoreId },
        {
          $inc: {
            'scores.$[score].value': -1
          }
        },
        {
          arrayFilters: [{ 'score._id': scoreId }]
        }
      )
    }
  })
})
