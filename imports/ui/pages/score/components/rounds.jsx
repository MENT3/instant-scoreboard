import React from 'react'

const Round = ({ movements, progress }) => (
  <div className="my-2 rounded-lg border p-4">
    <ul className="space-y-2">
      {movements?.map((m, i) => (
        <li key={i} className="w-full">
          <div>
            {m.noRep} - {m.movementName}
            <div className="w-full h-full bg-blue-50 border border-blue-100 rounded">
              <div
                className="h-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded"
                style={{ width: `${(progress[i] * 100) / m.noRep}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export const Rounds = ({ rounds, progress }) =>
  rounds.map((r, i) => <Round key={i} movements={r} progress={progress[i]} />)
