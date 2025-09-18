import React from 'react'

function Modal({ title, isOpen, onClose, children, size = 'md' }) {
  if (!isOpen) return null

  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
  }[size]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizeClass} mx-4 bg-white rounded-xl shadow-xl border border-slate-200`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition">✕</button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal


