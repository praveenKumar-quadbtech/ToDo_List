import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pagas/Home'
import { Login } from '../pagas/Login'
import { Register } from '../pagas/Register'
import PrivateRoute from './PrivateRoute'
import { TaskList } from '../pagas/TaskList'
import { TodayTask } from '../pagas/TodayTask'
import { ImportentTask } from '../pagas/ImportentTask'
import { PlanedTask } from '../pagas/PlanedTask'
import { AssignedTask } from '../pagas/AssignedTask'
import { PendingTask } from '../pagas/PendingTask'

export const AllRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <Home />
        }
      />
      {/* <Route
        path="/"
        element={
            <TaskList />
        }
      /> */}
      <Route
        path="/today"
        element={
          <PrivateRoute>
            <TodayTask />
          </PrivateRoute>
        }
      />
     
      <Route
        path="/important"
        element={
          <PrivateRoute>
            <ImportentTask />
          </PrivateRoute>
        }
      />

      <Route
        path="/planned"
        element={
          <PrivateRoute>
            <PlanedTask />
          </PrivateRoute>
        }
      />

      <Route
        path="/assigned"
        element={
          <PrivateRoute>
            <AssignedTask />
          </PrivateRoute>
        }
      />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}
