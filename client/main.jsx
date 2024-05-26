import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

import { App } from '/imports/ui/App'
import { ScorePage } from '../imports/ui/pages/score'
import { WodPage } from '../imports/ui/pages/score/wod'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/wods/:wodId', element: <WodPage /> },
  { path: '/wods/:wodId/scores/:scoreId', element: <ScorePage /> }
])

Meteor.startup(() => {
  createRoot(document.getElementById('react-target')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
})
