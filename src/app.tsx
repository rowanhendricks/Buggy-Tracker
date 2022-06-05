import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Project from './pages/Project'
import Projects from './pages/Projects'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/project/:project_id" element={<Project/>}/>
      </Routes>
    </BrowserRouter>
  )
}
