import { useState } from 'react'
import type { Issue, Status, StatusFilter } from '../types'
import { IssueCard } from './IssueCard'

 
type IssueListProps = {
  issues: Issue[]
  onSelect?: (id: string) => void
  onStatusChange?: (id: string, status: Status) => void
  onDelete?: (id: string) => void
}
 


//So, in the function IssueList, it takes a parameter of Issues with the type IssueListProps; the filter is set by setFilter and assigned all by default. When setFilter is called, it changes the value of the filter to match the value of the e.target.value if the value has been deemed acceptable by the IsStatusFilter which is what validates the status filters
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
    <section>
      <label>
        Filter by status
        <select value={filter} onChange={handleFilterChange}>
          {filters.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>
      <p>
        Showing {shown.length} of {issues.length} issues
      </p>
      {shown.length === 0 ? (
        <p>No issues to show.</p>
      ) : (
        <ul>
          {shown.map((issue) => (
            <li key={issue._id}>
              <IssueCard //component name then parameter(the prop being passed) name then the the variable containing the value that you want to pass.
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

