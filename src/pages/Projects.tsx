import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import { useState, FormEvent, MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";

export interface Project {
  name: string;
  issues: Map<string, Issue>;
}

export interface Issue {
  title: string;
  description: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Map<string, Project>>(new Map());
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const getData = async () => {
      setProjects(new Map(Object.entries(await invoke('read_project'))) ?? new Map());
    }
    getData();
  }, [])

  async function handleProjectSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await invoke('create_project', { name })
      setProjects(new Map(Object.entries(await invoke('read_project'))) ?? new Map());
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete(e: MouseEvent<HTMLButtonElement>, projectId: string) {
    try {
      await invoke("delete_project", { 
        projectId,
      })
      setProjects(new Map(Object.entries(await invoke('read_project'))) ?? new Map());
    } catch (error) {
      console.error(error)
    }
  }

  async function handleEditSubmit(e: FormEvent, name: string, projectId: string) {
    e.preventDefault();
    try {
      await invoke('update_project', {
        name,
        projectId,
      })
      setProjects(new Map(Object.entries(await invoke('read_project'))) ?? new Map());
    } catch (error) {
      console.error(error)
    }
  }

  try {
    appWindow.setTitle("Projects")
    const list = [];

    for (const [key, value] of projects) {
      list.push(
        <li key={key}>
          <Link to={`/project/${key}`}><h1>{value.name}</h1></Link>
          <button onClick={e => (handleDelete(e, key))}>🗑️</button>
          <button onClick={e => {}}>✏️</button>
          <form onSubmit={e => {handleEditSubmit(e, editName, key)}}>
            <input type="text" placeholder="title" onChange={e => setEditName(e.target.value)}/>
            <button type="submit" hidden></button>
          </form>
        </li>
      );
    }

    return (
      <div>
        <form onSubmit={handleProjectSubmit}>
          <input type="text" onChange={e => {setName(e.target.value)}} required/>
          <button type="submit">Create</button>
        </form>
        <ul>
          {list ?? <li key="0">No projects</li>}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <h1>ERROR</h1>
  }
}

export default Projects;