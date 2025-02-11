import React from 'react'
import { useSelector } from 'react-redux'

export const PlanedTask = () => {
  const { isGrid } = useSelector(state => state.themeAndLayout)
  return (
    <div className={`${isGrid ? "" : "w-full max-w-3xl m-auto"}`}>
      <div className="m-10 px-2 py-3 flex justify-between border-2 rounded-md dark:text-white">
          <h3>No Planed task found</h3>
      </div>
    </div>
  )
}
