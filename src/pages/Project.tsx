import { invoke } from "@tauri-apps/api";
import { TIssue, TProject } from "./types";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, MouseEvent, FormEvent, useState, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { Input, Button } from "@mantine/core";

const Project = () => {
  const [issues, setIssues] = useState<Map<string, TIssue>>(new Map());
  const [projects, setProjects] = useState<Map<string, TProject>>(new Map());
  const [editIssue, setEditIssue] = useState<TIssue>({title: "", description: ""});

  const { projectId } = useParams()

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
    const [edit, setEdit] = useState({issueId: "", isEdit: false});
    appWindow.setTitle(projects.get(projectId!)!.name ?? "Project")
    
    const list = [];

    for (let [key, value] of issues) {
      list.push(
        <li key={`${key}`}>
          <Link to={`/issue/${projectId}/${key}`}>
            <h2>{value.title}</h2>
          </Link>
          <Button onClick={(e: MouseEvent<HTMLButtonElement>) => (
            handleDelete(e, key)
          )}>🗑️</Button>
          <Button onClick={(e: MouseEvent<HTMLButtonElement>) => {
            setEdit({issueId: key, isEdit: !edit.isEdit })
          }}>✏️</Button>
          {
            edit.isEdit && edit.issueId === key
              ? 
                <form onSubmit={e => {
                  handleEditSubmit(e, editIssue.title, editIssue.description ,key)
                  setEdit({issueId: "", isEdit: false})
                }}>
                  <Input 
                    type="text" 
                    placeholder="title" 
                    onChange={(e: ChangeEvent) => 
                      setEditIssue({
                        title: (e.target as HTMLInputElement).value, 
                        description: editIssue.description
                    })} 
                    required
                  />
                  <Input 
                    type="text" 
                    placeholder="description" 
                    onChange={(e: ChangeEvent) => 
                      setEditIssue({
                        title: editIssue.title, 
                        description: (e.target as HTMLInputElement).value
                    })} 
                    required
                  />
                  <Button type="submit" hidden></Button>
                </form>
              : null
          }
        </li>
      )
    }

    return (
      <div>
        <Input type="text" placeholder="Search..."/>
        <Button 
          component={Link} 
          to={`/createIssue/${projectId}`}
        > Create Issue </Button>
  
        <fieldset>
          <legend>
            <h1>{projects.get(projectId!)!.name || "Issues"}</h1>
          </legend>
  
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