import React from 'react'
import { NavLink } from 'react-router-dom'

const WodItem = ({ item }) => {
  return (
    <div className="border rounded-lg p-4 space-y-2 flex-1">
      <h2 className="text-lg font-medium">{item.name}</h2>
      <p className="pl-1 text-sm text-gray-700 whitespace-pre">
        {item.description}
      </p>
      <NavLink
        to={`wods/${item._id}`}
        className={({ isActive, isPending }) =>
          isActive ? 'active' : isPending ? 'pending' : ''
        }
      >
        Wod page
      </NavLink>
    </div>
  )
}

export const Wods = ({ data }) => {
  return (
    <div className="flex gap-1">
      {data.map((d, i) => (
        <WodItem item={d} key={i} />
      ))}
    </div>
  )
}
