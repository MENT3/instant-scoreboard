import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

import { App } from '/imports/ui/App'
import { WodPage } from '../imports/ui/pages/wod'
import { ScoresPage } from '../imports/ui/pages/scores'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/wods/:wodId', element: <WodPage /> },
  { path: '/scores/:scoreId', element: <ScoresPage /> }
])

Meteor.startup(() => {
  createRoot(document.getElementById('react-target')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
})
