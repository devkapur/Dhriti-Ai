import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const userRole = getUserRole();

  const navItem = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-slate-100 ${isActive ? 'bg-slate-100 text-brand-700' : 'text-slate-700'}`
      }
      onClick={() => setOpen(false)}
    >
      <span>{label}</span>
    </NavLink>
  );

  return (
    <aside className="">
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white grid place-items-center font-bold">D</div>
          <span className="font-semibold">Dhriti.AI</span>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="p-2 rounded-lg hover:bg-slate-100">☰</button>
      </div>

      {/* Sidebar */}
      <div className={`md:sticky md:top-0 md:h-screen md:w-64 w-full bg-white border-r border-slate-200 p-4 space-y-4 ${open ? 'block' : 'hidden md:block'}`}>
        <div className="hidden md:flex items-center gap-2 px-2">
          <div className="w-9 h-9 rounded-lg bg-brand-600 text-white grid place-items-center font-bold">D</div>
          <span className="font-semibold">Dhriti.AI</span>
        </div>
        <nav className="space-y-1">
          {navItem({ to: '/dashboard', label: 'Dashboard' })}
          {userRole === 'admin' && (
            <details className="group">
              <summary className="list-none cursor-pointer">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100">Users</div>
              </summary>
              <div className="mt-1 ml-4 space-y-1">
                {navItem({ to: '/users/admins', label: 'Admins' })}
                {navItem({ to: '/users/experts', label: 'Experts' })}
                {navItem({ to: '/users/vendors', label: 'Vendors' })}
              </div>
            </details>
          )}
          {userRole === 'admin' && navItem({ to: '/tools/json-to-excel', label: 'JSON → Excel' })}
          {navItem({ to: '/projects', label: 'Projects' })}
          {navItem({ to: '/login', label: 'Logout' })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
