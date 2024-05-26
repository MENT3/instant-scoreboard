import React from 'react'

export const Actions = ({ scoreId }) => {
  return (
    <div className="flex flex-col gap-2">
      <button
        className="w-full px-3 py-8 border rounded-lg  border-green-300 bg-green-50 hover:bg-green-100 transition"
        onClick={() => Meteor.call('scores.inc', scoreId)}
      >
        Add
      </button>

      <button
        className="w-full px-3 py-3 border border-red-300 rounded-lg hover:bg-gray-100 transition"
        onClick={() => Meteor.call('scores.dec', scoreId)}
      >
        Remove
      </button>
    </div>
  )
}
