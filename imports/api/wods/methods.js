import { check } from 'meteor/check'

import { WodsCollection } from './collections'

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
