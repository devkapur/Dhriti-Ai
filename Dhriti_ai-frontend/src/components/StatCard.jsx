import React from 'react'

function StatCard({ label, value, trend, icon }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="mt-3 text-xs text-emerald-600">{trend} from last period</div>
    </div>
  )
}

export default StatCard


