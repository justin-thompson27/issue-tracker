import { Outlet, Route, Routes, useNavigate } from 'react-router'
import { NavBar } from './components/NavBar'
import { IssueEditPage } from './pages/IssueEditPage'
import { IssueListPage } from './pages/IssueListPage'
import { NotFoundPage } from './pages/NotFoundPage'
 
function Layout() {
  return (
    <>
      <header>
        <h1>Issue Tracker</h1>
        <NavBar />
      </header>
      <main>
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
