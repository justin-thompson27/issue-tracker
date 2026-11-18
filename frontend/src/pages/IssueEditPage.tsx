import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ApiError, getIssue, updateIssue } from '../api'
import type { IssueDraft } from '../api'
import { AddIssueForm } from '../components/AddIssueForm'
import type { Issue } from '../types'
 
type LoadState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; issue: Issue }
 
export function IssueEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate() //you use useNavigate to move to another page for Example navigate('/') takes you to the home page
  const [state, setState] = useState<LoadState>({ kind: 'loading' })
 
  useEffect(() => {
    if (!id) return //if the id is falsy return 
    let ignore = false
    setState({ kind: 'loading' })
    const load = async () => {
      try {
        const issue = await getIssue(id) //looks for a issue with ta matching id if an Issue isn't found getIssue will return an error because it wasn't able to parse the json from getJson inside of getIssue
        if (!ignore) setState({ kind: 'loaded', issue }) //if ignore is false then the issue is loaded 
      } catch (err) {
        if (ignore) return //if ignore is true then return
        setState({ kind: 'error', message: err instanceof ApiError ? err.message : 'Could not reach the server' }) //catches any error thrown by getIssue or a miscellanous error 
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [id]) //is mounted to the id variable changing 
 
  async function handleSave(draft: IssueDraft) {
    if (!id) return
    await updateIssue(id, draft)
    navigate('/')
  } //updates the issue and goes back to the home page after updating
 
  return (
    //link moves back to the home page when clicked 
    <section>
      <h2>Edit issue</h2>
      <Link to="/">Back to all issues</Link> 
      {state.kind === 'loading' && <p role="status">Loading issue…</p>}
      {state.kind === 'error' && <p role="alert">{state.message}</p>}
      {state.kind === 'loaded' && (
        <AddIssueForm
          onAdd={handleSave}
          initial={{
            title: state.issue.title,
            description: state.issue.description,
            stepsToReproduce: state.issue.stepsToReproduce,
            priority: state.issue.priority,
          }}
          submitLabel="Save changes"
          clearOnSuccess={false}
        />
      )}
    </section>
  )
}
