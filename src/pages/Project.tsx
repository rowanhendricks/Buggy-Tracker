import { invoke } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, MouseEvent, FormEvent, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Project {
  name: string;
  issues: Map<string, Issue>;
}

interface Issue {
  title: string;
  description: string;
}

const Project = () => {
  const [issues, setIssues] = useState<Map<string, Issue>>(new Map());
  const [projects, setProjects] = useState<Map<string, Project>>(new Map());
  const [editIssue, setEditIssue] = useState<Issue>({title: "", description: ""});

  const {projectId} = useParams()

  useEffect(() => {
    const getData = async () => {
      setProjects(new Map(Object.entries(await invoke('read_project'))) ?? new Map())
      setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map())
    }
    getData();
  }, [])

  async function handleDelete(e: MouseEvent<HTMLButtonElement>, issueId: string) {
    try {
      await invoke("delete_issue", { 
        issueId, 
        projectId,
      })
      setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map())
    } catch (error) {
      console.error(error)
    }
  }

  async function handleEditSubmit(e: FormEvent, title: string, description: string, issueId: string) {
    e.preventDefault();
    try {
      await invoke('update_issue', {
        title, 
        description,
        issueId,
        projectId,
      })
      setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map())
    } catch (error) {
      console.error(error)
    }
  }

  try {
    appWindow.setTitle(projects.get(projectId!)!.name ?? "Project")
    
    const list = [];

    for (let [key, value] of issues) {
      list.push(
        <li key={`${key}`}>
          <Link to={`/issue/${projectId}/${key}`}><h2>{value.title}</h2></Link>
          <button onClick={e => (handleDelete(e, key))}>🗑️</button>
          <button onClick={e => {}}>✏️</button>
          <form onSubmit={e => {handleEditSubmit(e, editIssue.title, editIssue.description ,key)}}>
            <input type="text" placeholder="title" onChange={e => setEditIssue({title: e.target.value, description: editIssue.description})} required/>
            <input type="text" placeholder="description" onChange={e => setEditIssue({title: editIssue.title, description: e.target.value})} required/>
            <button type="submit" hidden></button>
          </form>
        </li>
      )
    }

    return (
      <div>
        <input type="text" placeholder="Search..."/>
        <Link to={`/createIssue/${projectId}`}><button>Create Issue</button></Link>
  
        <fieldset>
          <legend><h1>{projects.get(projectId!)!.name || "Issues"}</h1></legend>
  
          <ul>
            {list ?? <li key="0">No projects</li>}
          </ul>
        </fieldset>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <h1>ERROR</h1>;
  }
}

export default Project;