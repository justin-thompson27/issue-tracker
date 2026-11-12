import { useEffect, useState } from 'react'
import { ApiError, listIssues } from '../api'
import { IssueList } from '../components/IssueList'
import type { Issue } from '../types'
 


//A "page" in this project is the component a route draws, and it owns the loading of its own data. It lives in src/pages. The card and the list are pieces: they live in src/components, stay simple, and only draw what they are handed 
type LoadState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; issues: Issue[] }

  //a page has three states loading , error or loaded 
 
export function IssueListPage() {
  const [state, setState] = useState<LoadState>({ kind: 'loading' }) //default state is loading 
 
  useEffect(() => {
    let ignore = false
    const load = async () => {
      try {
        const issues = await listIssues() //lists issues that have been parse to the schema and returns an array of issues if they all pass the schema check otherwise it will throw an error
        if (!ignore) setState({ kind: 'loaded', issues }) //if ignore is false  then the state will be set to loaded and loaded takes an array of issues as a parameter 
      } catch (err) {
        if (ignore) return
        setState({ kind: 'error', message: err instanceof ApiError ? err.message : 'Could not reach the server' }) //if ignore is true then it returns otherwise if a error is thrown the stat becomes error which takes a parameter of message which will be the api error message other it will default to "could not reach the server" if the error is not an instance of ApiError
        //when we use the send function for api.ts it can throw the APIerror if the request fails and the error will be caught here and the message will be displayed to the user
      }
    }
    load()
    return () => { //this is the clean up function 
      ignore = true // once this it set to true the code in load will stop before it can set the state to loaded or error because the component has been unmounted 
    }
  }, []) //since the array is empty this effect will only run once when the component is mounted and not again when it is updated or unmounts (is removed from the screen).
 
  if (state.kind === 'loading') return <p role="status">Loading issues…</p>
  if (state.kind === 'error') return <p role="alert">{state.message}</p>
  if (state.issues.length === 0) return <p>No issues yet. Add the first one.</p>
  return <IssueList issues={state.issues} /> //what this function returns is the array of issues from the loaded state which was assigned to it by the set state function in load 
}
