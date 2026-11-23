import { NavLink } from 'react-router'
import { cn } from '@/lib/utils'
 
// On a phone the links stack. From the "sm" width up they sit in a row.
export function NavBar() {
  return (
    <nav aria-label="Main" className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          cn('rounded-md px-2 py-1 text-sm', isActive ? 'bg-muted font-medium' : 'text-muted-foreground hover:text-foreground')
        }
      >
        Issues
      </NavLink>
    </nav>
  )
}
