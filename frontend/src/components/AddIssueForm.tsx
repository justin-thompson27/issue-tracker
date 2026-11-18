import { useState } from 'react'
import { ApiError } from '../api'
import type { IssueDraft } from '../api'
import type { Priority } from '../types'
 
//so issue form props has 4 fields, which are a function and three optional parameters the function returns void or a promise of void(What does a promise of void mean). The function isPriority checks if the priorities match the priorities array. Some checks if at least one value matches priority. type problems has three optional values but starts off as an empty array. The function add issue form takes 4 parameters and returns an object with a type of AddIssueFormProps title, description, steps have a default of empty if the value is null, and priority has a value of medium if initial is null , problems is an empty array and server message can be a string or null. Busy starts off as false if priority is changed and matches properly the value of priority is changed to the value of the drop down const draft is a trimmed version of user inputed values and const found only gets values in its array if values are missing while an issue is being added busy is set to true which turns of the submit button once successful it clears the values in all the textboxes if a error occurs a server message is sent that will default to could not reach the server if it doesn't match the api error if a problem occurs then a paragraph with the problem title or description or steps to produce will appear with the corresponding error message
type AddIssueFormProps = {
  onAdd: (draft: IssueDraft) => Promise<void> | void
  initial?: IssueDraft
  submitLabel?: string
  clearOnSuccess?: boolean
}
 
const priorities: Priority[] = ['low', 'medium', 'high']
 
function isPriority(value: string): value is Priority {
  return priorities.some((p) => p === value)
}
 
type Problems = { title?: string; description?: string; stepsToReproduce?: string }
 
export function AddIssueForm({
  onAdd,
  initial,
  submitLabel = 'Add issue',
  clearOnSuccess = true,
}: AddIssueFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [steps, setSteps] = useState(initial?.stepsToReproduce ?? '')
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'medium')
  const [problems, setProblems] = useState<Problems>({})
  const [serverMessage, setServerMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
 
  function handlePriorityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (isPriority(e.target.value)) {
      setPriority(e.target.value)
    }
  }
 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerMessage(null)
 
    const draft: IssueDraft = {
      title: title.trim(),
      description: description.trim(),
      stepsToReproduce: steps.trim(),
      priority,
    }
    const found: Problems = {}
    if (draft.title === '') found.title = 'Title is required'
    if (draft.description === '') found.description = 'Description is required'
    if (draft.stepsToReproduce === '') found.stepsToReproduce = 'Steps to reproduce are required'
    setProblems(found)
    if (Object.keys(found).length > 0) return
 
    setBusy(true)
    try {
      await onAdd(draft)
      if (clearOnSuccess) {
        setTitle('')
        setDescription('')
        setSteps('')
      }
    } catch (err) {
      setServerMessage(err instanceof ApiError ? err.message : 'Could not reach the server')
    } finally {
      setBusy(false)
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      {problems.title && <p role="alert">{problems.title}</p>}
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      {problems.description && <p role="alert">{problems.description}</p>}
      <label>
        Steps to reproduce
        <textarea value={steps} onChange={(e) => setSteps(e.target.value)} />
      </label>
      {problems.stepsToReproduce && <p role="alert">{problems.stepsToReproduce}</p>}
      <label>
        Priority
        <select value={priority} onChange={handlePriorityChange}>
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      {serverMessage && <p role="alert">{serverMessage}</p>}
      <button type="submit" disabled={busy}>
        {submitLabel}
      </button>
    </form>
  )
}
