import React, { useMemo, useState } from 'react'

function DataTable({ columns, data, searchable = true, paginated = true, rowsPerPage = 8, onEdit, onDelete }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!query) return data
    const q = query.toLowerCase()
    return data.filter((row) => Object.values(row).some((val) => String(val).toLowerCase().includes(q)))
  }, [data, query])

  const totalPages = paginated ? Math.max(1, Math.ceil(filtered.length / rowsPerPage)) : 1
  const pageData = paginated ? filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage) : filtered

  const go = (p) => setPage(Math.min(totalPages, Math.max(1, p)))

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        {searchable && (
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((c) => (
                <th key={c.accessor} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 border-b">
                  {c.Header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-3 border-b" />}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-slate-50">
                {columns.map((c) => (
                  <td key={c.accessor} className="px-4 py-3 text-sm text-slate-700">
                    {c.Cell ? c.Cell(row[c.accessor], row) : row[c.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 text-right space-x-2">
                    {onEdit && <button onClick={() => onEdit(row)} className="px-2 py-1 text-xs rounded-lg border hover:bg-slate-100">Edit</button>}
                    {onDelete && <button onClick={() => onDelete(row)} className="px-2 py-1 text-xs rounded-lg border text-red-600 hover:bg-red-50">Delete</button>}
                  </td>
                )}
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-6 text-center text-slate-500">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginated && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="text-slate-500">Page {page} of {totalPages}</div>
          <div className="space-x-2">
            <button onClick={() => go(1)} className="px-3 py-1 rounded-lg border disabled:opacity-40" disabled={page === 1}>First</button>
            <button onClick={() => go(page - 1)} className="px-3 py-1 rounded-lg border disabled:opacity-40" disabled={page === 1}>Prev</button>
            <button onClick={() => go(page + 1)} className="px-3 py-1 rounded-lg border disabled:opacity-40" disabled={page === totalPages}>Next</button>
            <button onClick={() => go(totalPages)} className="px-3 py-1 rounded-lg border disabled:opacity-40" disabled={page === totalPages}>Last</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable


