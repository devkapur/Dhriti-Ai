import React, { useRef, useState } from 'react'

function FileUpload({ onFileSelected }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [progress, setProgress] = useState(0)

  const handleFiles = (files) => {
    const file = files?.[0]
    if (!file) return
    setFileName(file.name)
    onFileSelected?.(file)
    // Simulate upload progress
    setProgress(0)
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); return 100 }
        return p + 10
      })
    }, 120)
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
        className={`rounded-xl border-2 border-dashed p-6 text-center transition ${dragOver ? 'border-brand-600 bg-brand-50' : 'border-slate-300 bg-slate-50'}`}
      >
        <div className="text-3xl">📤</div>
        <div className="mt-2 font-semibold">Drag and drop files here</div>
        <div className="text-sm text-slate-500">or</div>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-2 px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition">Browse files</button>
        <input ref={inputRef} type="file" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>

      {fileName && (
        <div className="text-sm">
          <div className="font-medium">Selected: {fileName}</div>
          <div className="mt-2 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload


