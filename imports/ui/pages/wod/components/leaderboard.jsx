import React from 'react'
import { motion } from 'framer-motion'

export const Leaderboard = ({ scores, wodMaxReps }) =>
  // TODO optimise it ?
  scores
    ?.sort((a, b) => parseInt(a.value) - parseInt(b.value))
    ?.reverse()
    ?.map((item, idx) => (
      <motion.div
        layout
        className="flex justify-between px-4 py-2 border-b last:border-0"
        key={item.athlete.name}
      >
        <div className="text-lg space-x-2">
          <span>{idx + 1}</span>
          <span>-</span>
          <span>{item.athlete.name}</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="w-[100px] bg-blue-50 border border-blue-100 rounded">
            <div
              className="h-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded"
              style={{ width: `${(item.value * 100) / wodMaxReps}%` }}
            ></div>
          </div>

          <div className="w-[1rem] text-lg">{item.value}</div>
        </div>
      </motion.div>
    ))
