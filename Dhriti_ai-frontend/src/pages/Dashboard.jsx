import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import StatCard from '../components/StatCard.jsx'
import { stats } from '../utils/dummyData.js'

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="md:flex md:gap-0">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Topbar />
          <div className="p-4 md:p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-slate-500">Overview of your platform metrics</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((s) => (
                <StatCard key={s.id} label={s.label} value={s.value} trend={s.trend} icon={s.icon} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard


