import { invoke } from "@tauri-apps/api/tauri";
import { FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { projectId } = useParams()
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await invoke('create_issue', {
        title, 
        description,
        projectId
      })
      navigate(`/project/${projectId}`, { replace: true });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input type="text" id="title" onChange={e => {setTitle(e.target.value)}} required/><br/>
      <label htmlFor="description">Description: </label>
      <input type="text" id="description" onChange={e => {setDescription(e.target.value)}} required/><br/>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateIssue;