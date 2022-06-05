import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Issue {
  title: string;
  description: string;
}

const Issue = () => {
  const [issues, setIssues] = useState<Map<string, Issue>>(new Map());
  const {projectId, issueId} = useParams()

  useEffect(() => {
    const getData = async () => {
      setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map())
    }
    getData();
  }, [])
  
  try {
    const issue: Issue = issues.get(issueId!)! ?? { title: "", description: "" };

    appWindow.setTitle(issue.title ?? "Project");

    return (
      <div id="issue">
        <h1 id="title">{issue.title}</h1>
        <p id="description">{issue.description}</p>
      </div>
    );
  } catch (error) {
    console.error(error)
    return (
      <h1>ERROR</h1>
    )
  }
}

export default Issue;