import { check } from 'meteor/check'

import { WodsCollection } from './collections'

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
