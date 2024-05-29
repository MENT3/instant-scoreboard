import { WodsCollection } from './collections'

export const wodSeeds = async () => {
  const wodCount = await WodsCollection.find().countAsync()

  if (wodCount === 0) {
    await WodsCollection.insertAsync({
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
          _id: '6652edc305a6d13684d69b00',
          athlete: { name: 'Jules CASTOR' },
          judge: { name: 'Tristan le juge' },
          value: 17
        },
        {
          _id: '6652edc305a6d13684d69b01',
          athlete: { name: 'John CONDE FERREIRA' },
          judge: { name: 'Tristan le juge' },
          value: 13
        },
        {
          _id: '6652edc305a6d13684d69b02',
          athlete: { name: 'Alexandre PINSOLE' },
          judge: { name: 'Tristan le juge' },
          value: 18
        },
        {
          _id: '6652edc405a6d13684d69b08',
          athlete: { name: 'Victor Hoffer' },
          judge: { name: 'Tristan le juge' },
          value: 23
        },
        {
          _id: '6652edc405a6d13684d69b09',
          athlete: { name: 'Clément RAMOS LAGE' },
          judge: { name: 'Tristan le juge' },
          value: 15
        },
        {
          _id: '6652edc405a6d13684d69b0a',
          athlete: { name: 'Romain LE POMPIER' },
          judge: { name: 'Tristan le juge' },
          value: 19
        },
        {
          _id: '6652edc505a6d13684d69b0b',
          athlete: { name: 'Guillaume BRILLANT' },
          judge: { name: 'Tristan le juge' },
          value: 28
        },
        {
          _id: '6652edc505a6d13684d69b0c',
          athlete: { name: 'Lucas HEUZE' },
          judge: { name: 'Tristan le juge' },
          value: 18
        }
      ]
    })
  }
}
