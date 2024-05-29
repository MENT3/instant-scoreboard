import { Meteor } from 'meteor/meteor'

// wods
import '../imports/api/wods/collections'
import '../imports/api/wods/methods'
import '../imports/api/wods/publish'

// const insertWod = async payload => {
//   await WodsCollection.insertAsync(payload)
// }

Meteor.startup(() => {})
//   if ((await WodsCollection.find().countAsync()) === 0) {
//     await insertWod({
//       name: 'Fran',
//       rounds: [
//         [
//           { noRep: 21, movementName: 'Thuster', type: 'rep' },
//           { noRep: 21, movementName: 'Chest to bar', type: 'rep' }
//         ],
//         [
//           { noRep: 15, movementName: 'Thuster', type: 'rep' },
//           { noRep: 15, movementName: 'Chest to bar', type: 'rep' }
//         ],
//         [
//           { noRep: 9, movementName: 'Thuster', type: 'rep' },
//           { noRep: 9, movementName: 'Chest to bar', type: 'rep' }
//         ]
//       ],
//       scores: [
//         {
//           _id: '6652d0ced431ac8ebec115ae',
//           athlete: { name: 'Jules CASTOR' },
//           judge: { name: 'Tristan le juge' },
//           value: 0
//         }
//       ]
//     })
//   }
// })
