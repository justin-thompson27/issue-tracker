import { Link } from 'react-router'
 
export function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>There is no page at this address.</p>
      <Link to="/">Back to the issue list</Link>
    </section>
  )
}
