import { z } from 'zod'
import { issueSchema } from './types'
import type { Issue } from './types'
 
type FieldProblem = { path: string; message: string }
 
export class ApiError extends Error {
  status: number
  details: FieldProblem[]
 
  constructor(status: number, message: string, details: FieldProblem[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}
 
async function send(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(path, init)
  if (!res.ok) { //checks for a res that in between 200 and 299 if not
    let message = `Request failed (${res.status})` //a message will be sent with the status code 
    let details: FieldProblem[] = [] //will store an arrary of field problems which is the status and details of a error
    try {
      const body: unknown = await res.json() //body's value will be the json of the response
      if (typeof body === 'object' && body !== null) { //if the json is a object and not empty and the error body/string isnt null it will be stored in the message and details
        if ('error' in body && typeof body.error === 'string') message = body.error
        if ('details' in body && Array.isArray(body.details)) details = body.details
      }
    } catch {
      // The server did not send JSON. The generic message above is enough.
    }
    throw new ApiError(res.status, message, details) //if the request fails it will throw an error with the status, message and details of the error for example bad gateway, not found, unauthorized, etc.
  }
  return res //otherwise it returns the response if the request is successful
}
 

//init? is Optional request configuration, such as method, headers, or body.
async function getJson<T>(path: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> { // T is a basic type that accepts any data type
  const res = await send(path, init) //sends request to the server and waits for the response and then checks the body of the json against the schema given as a arguement 
  return schema.parse(await res.json()) //throws an error if the body is wrong because this isn't safe parse otherwise it returns the json body
}
 
 
export function listIssues(): Promise<Issue[]> {
  return getJson('/issues', z.array(issueSchema)) //z.arrary creates an array of the schemas , if a single issue is sent then it will throw an error because multiple issues are expected
  //get json returns a validated array of issues if they all pass the schema check otherwise it will throw an error
}
