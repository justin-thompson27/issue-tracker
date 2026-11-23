/* import { useState } from 'react'
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
 */


import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import type { Issue, Status } from '../types'
 
type IssueCardProps = {
  issue: Issue
  onSelect?: (id: string) => void
  onStatusChange?: (id: string, status: Status) => void
  onDelete?: (id: string) => void
}
 
const priorityBadge = {
  low: 'secondary',
  medium: 'outline',
  high: 'destructive',
} as const
 
export function IssueCard({ issue, onSelect, onStatusChange, onDelete }: IssueCardProps) {
  const [confirming, setConfirming] = useState(false)
 
  return (
    <article>
      <Card>
        <CardContent className="flex flex-col gap-3">
          <h3 className="text-base font-medium">{issue.title}</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{issue.status}</Badge>
            <Badge variant={priorityBadge[issue.priority]}>Priority: {issue.priority}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Reported by {issue.author.fullName}</p>
          <div className="flex flex-wrap items-center gap-2">
            {onSelect && (
              <Button type="button" variant="outline" size="sm" onClick={() => onSelect(issue._id)}>
                View
              </Button>
            )}
            {onStatusChange && (
              <label className="flex items-center gap-2 text-sm">
                Status
                <NativeSelect
                  size="sm"
                  value={issue.status}
                  onChange={(e) => {
                    const next = e.target.value
                    if (next === 'open' || next === 'in-progress' || next === 'closed') {
                      onStatusChange(issue._id, next)
                    }
                  }}
                >
                  <NativeSelectOption value="open">open</NativeSelectOption>
                  <NativeSelectOption value="in-progress">in-progress</NativeSelectOption>
                  <NativeSelectOption value="closed">closed</NativeSelectOption>
                </NativeSelect>
              </label>
            )}
            {onDelete && !confirming && (
              <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(true)}>
                Delete
              </Button>
            )}
            {onDelete && confirming && (
              <span className="flex flex-wrap items-center gap-2 text-sm">
                <span>Delete this issue?</span>
                <Button type="button" variant="destructive" size="sm" onClick={() => onDelete(issue._id)}>
                  Yes, delete
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  )
}
