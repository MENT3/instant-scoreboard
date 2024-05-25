import React from 'react'
import { useFind, useSubscribe } from 'meteor/react-meteor-data'

import { CompetitionsCollection } from '../api/competitions.js'
import { Wods } from './components/wods.jsx'

export const App = () => {
  const isLoading = useSubscribe('competitions')
  const competitions = useFind(
    () => CompetitionsCollection.find({ _id: 'TS4C4ZXD4vzrJsym5' }),
    []
  )

  if (isLoading())
    return (
      <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">Loading...</div>
    )

  return (
    <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
      Instant score
      <Wods data={competitions[0]?.wods} />
    </div>
  )
}
