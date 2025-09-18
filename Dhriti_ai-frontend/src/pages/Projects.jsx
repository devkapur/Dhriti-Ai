import React, { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import DataTable from '../components/DataTable.jsx'
import Modal from '../components/Modal.jsx'
import FileUpload from '../components/FileUpload.jsx'
import { projects as seedProjects } from '../utils/dummyData.js'

function Projects() {
  const [rows, setRows] = useState(seedProjects)
  const [addOpen, setAddOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)

  const columns = useMemo(() => ([
    { Header: 'Project Name', accessor: 'name' },
    { Header: 'Status', accessor: 'status', Cell: (v) => <span className={`px-2 py-1 rounded-full text-xs ${v === 'Active' ? 'bg-emerald-50 text-emerald-700' : v === 'Completed' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{v}</span> },
    { Header: 'Total Tasks Added', accessor: 'tasksAdded' },
    { Header: 'Total Tasks Completed', accessor: 'tasksCompleted' },
    { Header: 'Association', accessor: 'association' },
  ]), [])

  const onDelete = (row) => setRows((r) => r.filter((x) => x.id !== row.id))
  const onEdit = (row) => {
    // For brevity, just toggle status
    setRows((r) => r.map((x) => x.id === row.id ? { ...x, status: x.status === 'Active' ? 'Paused' : 'Active' } : x))
  }

  const onSaveNew = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const newProject = {
      id: Date.now(),
      name: f.get('name'),
      status: f.get('status'),
      tasksAdded: Number(f.get('tasksAdded') || 0),
      tasksCompleted: Number(f.get('tasksCompleted') || 0),
      association: f.get('association'),
    }
    setRows((r) => [newProject, ...r])
    setAddOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar />
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Projects</h1>
              <p className="text-slate-500">Manage and track project progress</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setUploadOpen(true)} className="px-3 py-2 rounded-lg border hover:bg-slate-50">Upload Data</button>
              <button onClick={() => setAddOpen(true)} className="px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700">Add Project</button>
            </div>
          </div>

          <DataTable columns={columns} data={rows} onEdit={onEdit} onDelete={onDelete} />

          <Modal title="Add Project" isOpen={addOpen} onClose={() => setAddOpen(false)}>
            <form onSubmit={onSaveNew} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Project Name</label>
                  <input name="name" required className="w-full px-3 py-2 rounded-lg border" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Status</label>
                  <select name="status" className="w-full px-3 py-2 rounded-lg border">
                    <option>Active</option>
                    <option>Paused</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Total Tasks Added</label>
                  <input name="tasksAdded" type="number" min="0" className="w-full px-3 py-2 rounded-lg border" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Total Tasks Completed</label>
                  <input name="tasksCompleted" type="number" min="0" className="w-full px-3 py-2 rounded-lg border" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Association</label>
                  <input name="association" className="w-full px-3 py-2 rounded-lg border" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAddOpen(false)} className="px-3 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-3 py-2 rounded-lg bg-brand-600 text-white">Save</button>
              </div>
            </form>
          </Modal>

          <Modal title="Upload Data" isOpen={uploadOpen} onClose={() => setUploadOpen(false)} size="lg">
            <FileUpload onFileSelected={() => {}} />
          </Modal>
        </div>
      </main>
    </div>
  )
}

export default Projects


