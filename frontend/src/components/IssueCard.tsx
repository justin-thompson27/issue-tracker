import type { Issue } from '../types'
 
type IssueCardProps = {
  issue: Issue
  onSelect?: (_id: string) => void
}
 
export function IssueCard({ issue, onSelect }: IssueCardProps) {
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
    </article>
  )
}

