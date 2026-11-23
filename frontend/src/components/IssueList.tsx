import { useState } from 'react'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import type { Issue, Status, StatusFilter } from '../types'
import { IssueCard } from './IssueCard'
 
type IssueListProps = {
  issues: Issue[]
  onSelect?: (id: string) => void
  onStatusChange?: (id: string, status: Status) => void
  onDelete?: (id: string) => void
}
 
const filters: StatusFilter[] = ['all', 'open', 'in-progress', 'closed']
 
function isStatusFilter(value: string): value is StatusFilter {
  return filters.some((f) => f === value)
}
 
export function IssueList({ issues, onSelect, onStatusChange, onDelete }: IssueListProps) {
  const [filter, setFilter] = useState<StatusFilter>('all')
 
  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (isStatusFilter(e.target.value)) {
      setFilter(e.target.value)
    }
  }
 
  const shown = filter === 'all' ? issues : issues.filter((i) => i.status === filter)
 
  return (
    <section className="flex flex-col gap-4">
      <label className="flex items-center gap-2 text-sm">
        Filter by status
        <NativeSelect value={filter} onChange={handleFilterChange}>
          {filters.map((f) => (
            <NativeSelectOption key={f} value={f}>
              {f}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </label>
      <p className="text-sm text-muted-foreground">
        Showing {shown.length} of {issues.length} issues
      </p>
      {shown.length === 0 ? (
        <p className="text-sm text-muted-foreground">No issues to show.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {shown.map((issue) => (
            <li key={issue._id}>
              <IssueCard
                issue={issue}
                onSelect={onSelect}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
