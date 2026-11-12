import { useState } from 'react'
import type { Issue, Status } from '../types'
 
type IssueCardProps = {
  issue: Issue
  onSelect?: (id: string) => void
  onStatusChange?: (id: string, status: Status) => void
  onDelete?: (id: string) => void
}
 
export function IssueCard({ issue, onSelect, onStatusChange, onDelete }: IssueCardProps) {
  const [confirming, setConfirming] = useState(false)
 
  return (
    <article>
      <h3>{issue.title}</h3>
      <p>{issue.status}</p>
      <p>Priority: {issue.priority}</p>
      <p>Reported by {issue.author.fullName}</p>
      {onSelect && (
        <button type="button" onClick={() => onSelect(issue._id)}>
          View
        </button>
      )}
      {onStatusChange && (
        <label>
          Status
          <select
            value={issue.status}
            onChange={(e) => {
              const parsed = e.target.value
              if (parsed === 'open' || parsed === 'in-progress' || parsed === 'closed') {
                onStatusChange(issue._id, parsed)
              }
            }}
          >
            <option value="open">open</option>
            <option value="in-progress">in-progress</option>
            <option value="closed">closed</option>
          </select>
        </label>
      )}
      {onDelete && !confirming && (
        <button type="button" onClick={() => setConfirming(true)}>
          Delete
        </button>
      )}
      {onDelete && confirming && (
        <span>
          <span>Delete this issue?</span>
          <button type="button" onClick={() => onDelete(issue._id)}>
            Yes, delete
          </button>
          <button type="button" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </span>
      )}
    </article>
  )
}
