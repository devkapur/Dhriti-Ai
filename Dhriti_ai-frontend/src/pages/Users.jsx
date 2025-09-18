import React, { useMemo, useState } from 'react'
import { NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import DataTable from '../components/DataTable.jsx'
import Modal from '../components/Modal.jsx'
import { users as usersData } from '../utils/dummyData.js'

function Users() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar />
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">Users</h1>
              <p className="text-slate-500">Manage admins, experts and vendors</p>
            </div>
          </div>

          <div className="mb-4 flex gap-2">
            <TabLink to="admins" label="Admins" />
            <TabLink to="experts" label="Experts" />
            <TabLink to="vendors" label="Vendors" />
          </div>

          <Routes>
            <Route path="" element={<Navigate to="admins" replace />} />
            <Route path="admins" element={<UsersTable initialRows={usersData.admins} roleLabel="Admin" />} />
            <Route path="experts" element={<UsersTable initialRows={usersData.experts} roleLabel="Expert" />} />
            <Route path="vendors" element={<UsersTable initialRows={usersData.vendors} roleLabel="Vendor" />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function TabLink({ to, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => `px-3 py-1.5 rounded-lg border text-sm ${isActive ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>{label}</NavLink>
  )
}

function UsersTable({ initialRows, roleLabel }) {
  const [rows, setRows] = useState(initialRows)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const columns = useMemo(() => ([
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Phone', accessor: 'phone' },
    { Header: 'Status', accessor: 'status', Cell: (v) => <span className={`px-2 py-1 rounded-full text-xs ${v === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{v}</span> },
  ]), [])

  const onDelete = (row) => {
    setRows((r) => r.filter((x) => x.id !== row.id))
  }

  const onEdit = (row) => {
    setEditing(row)
    setModalOpen(true)
  }

  const onAdd = () => {
    setEditing({ id: Date.now(), name: '', email: '', phone: '', status: 'Active' })
    setModalOpen(true)
  }

  const onSave = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const updated = {
      id: Number(form.get('id')),
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      status: form.get('status'),
    }
    setRows((r) => {
      const exists = r.some((x) => x.id === updated.id)
      return exists ? r.map((x) => (x.id === updated.id ? updated : x)) : [{ ...updated }, ...r]
    })
    setModalOpen(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button onClick={onAdd} className="px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700">Add {roleLabel}</button>
      </div>
      <DataTable columns={columns} data={rows} onEdit={onEdit} onDelete={onDelete} />

      <Modal title={`${editing?.id ? 'Edit' : 'Add'} ${roleLabel}`} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={onSave} className="space-y-3">
          <input type="hidden" name="id" defaultValue={editing?.id} />
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input name="name" defaultValue={editing?.name} required className="w-full px-3 py-2 rounded-lg border" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input name="email" type="email" defaultValue={editing?.email} required className="w-full px-3 py-2 rounded-lg border" />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input name="phone" defaultValue={editing?.phone} required className="w-full px-3 py-2 rounded-lg border" />
            </div>
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select name="status" defaultValue={editing?.status} className="w-full px-3 py-2 rounded-lg border">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-3 py-2 rounded-lg bg-brand-600 text-white">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Users


