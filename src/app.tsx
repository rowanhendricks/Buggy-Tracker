import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Project from './pages/Project'
import CreateIssue from './pages/CreateIssue';
import Issue from './pages/Issue'
import Projects from './pages/Projects'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/createIssue/:project_id" element={<CreateIssue/>}/>
        <Route path="/project/:project_id" element={<Project/>}/>
        <Route path="/issue/:project_id:/issue_id" element={<Issue/>}/>
      </Routes>
    </BrowserRouter>
  )
}
