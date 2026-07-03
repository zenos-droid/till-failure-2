import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortKey?: string;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchFilter?: (row: T, query: string) => boolean;
  emptyStateMessage?: string;
}

export function Table<T>({ 
  data, 
  columns, 
  searchPlaceholder, 
  searchFilter, 
  emptyStateMessage = "No matching records documented in this local register." 
}: TableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Filter first
  const filteredData = React.useMemo(() => {
    if (!searchQuery || !searchFilter) return data;
    return data.filter(row => searchFilter(row, searchQuery));
  }, [data, searchQuery, searchFilter]);

  // Sort second
  const processedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    const sorted = [...filteredData].sort((a: any, b: any) => {
      // Crude resolution of sort keys or general fallback
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA === undefined || valB === undefined) return 0;
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Search block */}
      {searchFilter && (
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder={searchPlaceholder || "Filter records..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 pl-11 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 transition-colors"
          />
        </div>
      )}

      {/* Overflow context wrapper */}
      <div className="w-full overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30">
                {columns.map((col, idx) => (
                  <th 
                    key={idx} 
                    onClick={() => col.sortKey && requestSort(col.sortKey)}
                    className={`p-4 font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold select-none ${col.sortKey ? 'cursor-pointer hover:text-white' : ''} ${col.className || ''}`}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.header}
                      {col.sortKey && sortConfig?.key === col.sortKey && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60 font-medium">
              {processedData.length > 0 ? (
                processedData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-zinc-900/20 transition-colors">
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className={`p-4 text-zinc-300 leading-relaxed ${col.className || ''}`}>
                        {col.accessor(row)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-12 text-center">
                    <p className="text-zinc-500 text-xs font-mono">{emptyStateMessage}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Table;
