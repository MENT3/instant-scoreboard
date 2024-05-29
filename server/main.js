import { Meteor } from 'meteor/meteor'

// wods
import '../imports/api/wods/collections'
import '../imports/api/wods/methods'
import '../imports/api/wods/publish'
import { wodSeeds } from '../imports/api/wods/seeds'

Meteor.startup(async () => {
  await wodSeeds()
})
