import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

import { WodsCollection } from '/imports/api/collections'

const insertWod = async payload => {
  await WodsCollection.insertAsync(payload)
}

Meteor.startup(async () => {
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

  Meteor.publish('wod-by-id', wodId => WodsCollection.find({ _id: wodId }))

  Meteor.publish('wod-by-id-with-score', (wodId, scoreId) => {
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
