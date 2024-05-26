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

  Meteor.publish('wod-by-id-with-score', function ({ wodId, scoreId }) {
    check(wodId, String)
    check(scoreId, String)

    const pipeline = [
      { $match: { _id: wodId } },
      { $unwind: '$scores' },
      { $match: { 'scores._id': scoreId } },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          rounds: { $first: '$rounds' },
          score: { $first: '$scores' }
        }
      }
    ]

    const cursor = WodsCollection.rawCollection().aggregate(pipeline)
    cursor.toArray((err, res) => {
      if (err) {
        console.error('Aggregation error:', err)
        this.ready()
        return
      }

      if (res.length > 0) res.forEach(doc => this.added('wods', doc._id, doc))
      this.ready()
    })
  })

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
