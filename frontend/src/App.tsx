import { Outlet, Route, Routes, useNavigate } from 'react-router'
import { NavBar } from './components/NavBar'
import { IssueEditPage } from './pages/IssueEditPage'
import { IssueListPage } from './pages/IssueListPage'
import { NotFoundPage } from './pages/NotFoundPage'
 
function Layout() {
 return (
    <>
      <header className="border-b">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-primary">True Industries</p>
          <h1 className="text-xl font-semibold">Issue Tracker</h1>
           <p className="text-sm text-muted-foreground">Always Improving humanity</p>
          <NavBar />
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-4">
        <Outlet />
      </main>
    </>
  )
}

 
// The list page does not know about the router. This small wrapper connects the two.
function ListRoute() {
  const navigate = useNavigate()
  return <IssueListPage onSelect={(id) => navigate(`/edit/${id}`)} />
}
 
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListRoute />} />
        <Route path="edit/:id" element={<IssueEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
