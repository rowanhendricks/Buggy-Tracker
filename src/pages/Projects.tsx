import { invoke } from "@tauri-apps/api/tauri";
import { TProject } from "./types";
import { appWindow } from "@tauri-apps/api/window";
import { useState, FormEvent, MouseEvent, useEffect } from "react";
import { Input, Button } from '@mantine/core';
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState<Map<string, TProject>>(new Map());
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
          <Link to={`/project/${key}`}>
              <h1>{value.name}</h1>
          </Link>
          <Button 
            onClick={(e: MouseEvent<HTMLButtonElement>) => (
              handleDelete(e, key
          ))}>🗑️</Button>
          <Button onClick={(e: MouseEvent<HTMLButtonElement>) => {
            
          }}>✏️</Button>
          <form onSubmit={e => {handleEditSubmit(e, editName, key)}}>
            <input type="text" placeholder="title" onChange={e => setEditName(e.target.value)}/>
            <Button type="submit" hidden></Button>
          </form>
        </li>
      );
    }

    return (
      <div>
        <form onSubmit={handleProjectSubmit}>
          <Input 
            type="text"
            onChange={(e: FormEvent) => {
              setName((e.target as HTMLInputElement).value)
            }} 
            required
          />
          <Button type="submit">Create</Button>
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