import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'

function Tasks() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="md:flex md:gap-0">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Topbar />
          <div className="p-4 md:p-6 space-y-6">
            <div className="flex items-center gap-2">
                <span className="text-2xl">🙏</span>
                <h1 className="text-2xl font-semibold">Welcome,</h1>
            </div>
            {/* Assigned Projects */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="text-blue-500 text-xl">::</span> Assigned Projects</h2>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-slate-500 bg-slate-50">
                            <th className="p-2">Project name</th>
                            <th className="p-2">Avg Task time limit</th>
                            <th className="p-2">Avg Rating</th>
                            <th className="p-2">Completed Task</th>
                            <th className="p-2">Pending Task</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-2">BinPref_Prod_PortugueseBP2</td>bg
                            <td className="p-2">30 minutes</td>
                            <td className="p-2">No Reviews</td>
                            <td className="p-2">466</td>
                            <td className="p-2">0</td>
                            <td className="p-2"><a href="#" className="text-blue-600 font-semibold">Start Tasking &gt;</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Recent Task Reviews */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><span className="text-blue-500 text-xl">⭐</span> Recent Task Reviews</h2>
                <div className="text-center text-slate-500 py-8">
                    <p>You'll only see this section if you receive review on your task. To check review later, go to the "Completed Task" section.</p>
                    <div className="mt-4">
                        {/* Illustration placeholder */}
                        <svg className="mx-auto w-32 h-32 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M19 2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H5V4h14v16zM11 10H9v6h2v-6zm4 0h-2v6h2v-6z" /></svg>
                    </div>
                </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default Tasks
