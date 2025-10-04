import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import DataTable from '../components/DataTable.jsx'
import Modal from '../components/Modal.jsx'
import FileUpload from '../components/FileUpload.jsx'
import { getToken } from '../utils/auth.js'

const API_BASE = 'http://localhost:8000'

function Projects() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [addOpen, setAddOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)
  const [assignError, setAssignError] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [addError, setAddError] = useState('')

  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState('')

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        setError('')
        const token = getToken()
        if (!token) {
          throw new Error('You need to log in again.')
        }
        const response = await fetch(`${API_BASE}/tasks/admin/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}))
          throw new Error(payload.detail || 'Unable to load projects right now.')
        }
        const data = await response.json()
        const mapped = data.map(p => ({
          id: p.id,
          name: p.name,
          status: p.status,
          default_avg_task_time_minutes: p.default_avg_task_time_minutes,
        }))
        setRows(mapped)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const columns = useMemo(
    () => [
      { Header: 'Project Name', accessor: 'name' },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: v => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              v === 'Active'
                ? 'bg-emerald-50 text-emerald-700'
                : v === 'Completed'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            {v}
          </span>
        ),
      },
      {
        Header: 'Default Task Time',
        accessor: 'default_avg_task_time_minutes',
        Cell: value => (value ? `${value} min` : '—'),
      },
    ],
    []
  )

  const openAssignModal = async project => {
    setSelectedProject(project)
    setAssignError('')
    setUsersError('')
    setAssignOpen(true)

    if (users.length === 0 && !usersLoading) {
      try {
        setUsersLoading(true)
        setUsersError('')
        const token = getToken()
        if (!token) {
          throw new Error('You need to log in again.')
        }
        const response = await fetch(`${API_BASE}/tasks/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}))
          throw new Error(payload.detail || 'Unable to fetch users.')
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setUsersError(err.message)
      } finally {
        setUsersLoading(false)
      }
    }
  }

  const onSaveNew = async e => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setAddError('')
    setError('')
    const payload = {
      name: f.get('name'),
      status: f.get('status'),
      default_avg_task_time_minutes: f.get('defaultTime') ? Number(f.get('defaultTime')) : null,
    }

    try {
      const token = getToken()
      if (!token) {
        throw new Error('You need to log in again.')
      }

      const response = await fetch(`${API_BASE}/tasks/admin/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const payloadErr = await response.json().catch(() => ({}))
        throw new Error(payloadErr.detail || 'Unable to create project.')
      }

      const created = await response.json()
      setRows(r => [
        {
          id: created.id,
          name: created.name,
          status: created.status,
          default_avg_task_time_minutes: created.default_avg_task_time_minutes,
        },
        ...r,
      ])
      setAddOpen(false)
    } catch (err) {
      setAddError(err.message)
    }
  }

  const onAssignSubmit = async e => {
    e.preventDefault()
    if (!selectedProject) return
    setAssignError('')
    const f = new FormData(e.currentTarget)
    const payload = {
      user_id: Number(f.get('user_id')),
      project_id: selectedProject.id,
      status: f.get('status') || undefined,
      avg_task_time_minutes: f.get('avg_time') ? Number(f.get('avg_time')) : undefined,
      completed_tasks: f.get('completed') ? Number(f.get('completed')) : undefined,
      pending_tasks: f.get('pending') ? Number(f.get('pending')) : undefined,
    }

    try {
      const token = getToken()
      if (!token) {
        throw new Error('You need to log in again.')
      }

      const response = await fetch(`${API_BASE}/tasks/admin/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const payloadErr = await response.json().catch(() => ({}))
        throw new Error(payloadErr.detail || 'Unable to assign project.')
      }

      setAssignOpen(false)
      setSelectedProject(null)
      e.currentTarget.reset()
    } catch (err) {
      setAssignError(err.message)
    }
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

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
          )}

          {loading ? (
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-center text-slate-500">Loading projects…</div>
          ) : (
            <DataTable columns={columns} data={rows} onEdit={openAssignModal} searchable />
          )}

          <Modal
            title="Add Project"
            isOpen={addOpen}
            onClose={() => {
              setAddOpen(false)
              setAddError('')
            }}
          >
            <form onSubmit={onSaveNew} className="space-y-3">
              {addError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{addError}</div>
              )}
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
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Default Task Time (minutes)</label>
                  <input name="defaultTime" type="number" min="1" className="w-full px-3 py-2 rounded-lg border" placeholder="Optional" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setAddOpen(false)} className="px-3 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-3 py-2 rounded-lg bg-brand-600 text-white">Save</button>
              </div>
            </form>
          </Modal>

          <Modal
            title={selectedProject ? `Assign ${selectedProject.name}` : 'Assign Project'}
            isOpen={assignOpen}
            onClose={() => {
              setAssignOpen(false)
              setSelectedProject(null)
              setAssignError('')
            }}
          >
            <form onSubmit={onAssignSubmit} className="space-y-3" key={selectedProject?.id ?? 'assign'}>
              {assignError && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{assignError}</div>}
              <div>
                <label className="block text-sm mb-1">Select User</label>
                <select
                  name="user_id"
                  required
                  className="w-full px-3 py-2 rounded-lg border"
                  defaultValue=""
                  disabled={usersLoading || (!!usersError && users.length === 0)}
                >
                  <option value="" disabled>
                    {usersLoading ? 'Loading users…' : usersError ? usersError : 'Choose user'}
                  </option>
                  {!usersLoading && !usersError &&
                    users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.email} ({user.role})
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Status</label>
                  <select name="status" className="w-full px-3 py-2 rounded-lg border">
                    <option value="">Use project default</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Avg Task Time (minutes)</label>
                  <input name="avg_time" type="number" min="1" className="w-full px-3 py-2 rounded-lg border" placeholder={selectedProject?.default_avg_task_time_minutes || 'Optional'} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Completed Tasks</label>
                  <input name="completed" type="number" min="0" className="w-full px-3 py-2 rounded-lg border" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Pending Tasks</label>
                  <input name="pending" type="number" min="0" className="w-full px-3 py-2 rounded-lg border" placeholder="Optional" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAssignOpen(false)
                    setSelectedProject(null)
                    setAssignError('')
                  }}
                  className="px-3 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-2 rounded-lg bg-brand-600 text-white">Assign</button>
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


