import { NavLink } from 'react-router'
 
export function NavBar() {
  return (
    <nav aria-label="Main">
      <NavLink to="/" end>
        Issues
      </NavLink>
    </nav>
  )
}
